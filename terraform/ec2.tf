resource "aws_instance" "web_server" {
  ami           = var.aws_instance_ami
  instance_type = var.aws_instance_type
  subnet_id = module.vpc.public_subnets
  vpc_security_group_ids = [module.public_sg.security_group_id]
  tags = {
    Name = "ExampleWebServerInstance"
  }
}
resource "aws_instance" "app_server" {
  ami           = var.aws_instance_ami
  instance_type = var.aws_instance_type
  subnet_id = module.vpc.private_subnets
  vpc_security_group_ids = [module.private_sg.security_group_id]


  tags = {
    Name = "ExampleAppServerInstance"
  }
}

resource "aws_instance" "nat" {
  ami           = var.aws_instance_ami
  instance_type = var.aws_instance_type
  subnet_id = module.vpc.public_subnets
  vpc_security_group_ids = [module.nat_sg.security_group_id]

  tags = {
    Name = "NAT Instance"
  }
}
