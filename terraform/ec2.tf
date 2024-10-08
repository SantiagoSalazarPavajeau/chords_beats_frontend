# resource "aws_instance" "web_server" {
#   ami           = var.aws_instance_ami
#   instance_type = var.aws_instance_type
#   subnet_id = module.vpc.public_subnets[0]
#   vpc_security_group_ids = [module.public_sg.security_group_id]
#   tags = {
#     Name = "ExampleWebServerInstance"
#   }
# }
module "ec2_public" {
  source  = "terraform-aws-modules/ec2-instance/aws"
  version = "5.7.0"
  name = "${local.name}-WebServerHost"
  ami                    = var.aws_instance_ami
  instance_type          = var.aws_instance_type
  key_name               = var.instance_keypair
  #monitoring             = true
  subnet_id              = module.vpc.public_subnets[0]
  vpc_security_group_ids = [module.public_sg.security_group_id]
  
  tags = local.common_tags
}
resource "aws_instance" "app_server" {
  ami           = var.aws_instance_ami
  instance_type = var.aws_instance_type
  subnet_id = module.vpc.private_subnets[0]
  vpc_security_group_ids = [module.private_sg.security_group_id]


  tags = {
    Name = "ExampleAppServerInstance"
  }
}

resource "aws_instance" "nat" {
  ami           = var.aws_instance_ami
  instance_type = var.aws_instance_type
  subnet_id = module.vpc.public_subnets[0]
  vpc_security_group_ids = [module.nat_sg.security_group_id]

  tags = {
    Name = "NAT Instance"
  }
}
