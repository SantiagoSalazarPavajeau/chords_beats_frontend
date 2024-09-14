module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.13.0"

    
  # VPC Basic Details
  name = "${var.vpc_name}-${local.name}"
  cidr = var.vpc_cidr_block 
  azs                 = var.vpc_availability_zones
  public_subnets      = var.vpc_public_subnets
  private_subnets     = var.vpc_private_subnets

  # VPC DNS Parameters
  enable_dns_hostnames = true
  enable_dns_support = true

  public_subnet_tags = {
    Type = "public-subnets"
  }

  tags = local.common_tags

  vpc_tags = local.common_tags
  # Instances launched into the Public subnet should be assigned a public IP address.
  map_public_ip_on_launch = true
  create_igw = true
}