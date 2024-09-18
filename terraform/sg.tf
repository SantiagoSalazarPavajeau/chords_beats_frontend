module "public_sg" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "5.2.0"

  name        = "public_sg"
  description = "Allow inbound traffic from the internet"
  vpc_id      = module.vpc.vpc_id

  ingress_cidr_blocks = ["0.0.0.0/0"]
  ingress_rules       = ["ssh-tcp"]

  egress_cidr_blocks = ["0.0.0.0/0"]
  egress_rules       = ["all-all"]
}

module "nat_sg" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "5.2.0"

  name        = "nat_sg"
  description = "Allow traffic from private subnet"
  vpc_id      = module.vpc.vpc_id

  ingress_cidr_blocks = ["10.0.2.0/24"]
  ingress_rules       = ["all-all"]

  egress_cidr_blocks = ["0.0.0.0/0"]
  egress_rules       = ["all-all"]
}

module "private_sg" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "5.2.0"

  name        = "private_sg"
  description = "Allow traffic from public subnet and NAT instance"
  vpc_id      = module.vpc.vpc_id

  ingress_cidr_blocks = ["10.0.1.0/24"]
  ingress_rules       = ["all-all"]

  egress_cidr_blocks = ["0.0.0.0/0"]
  egress_rules       = ["all-all"]
}
