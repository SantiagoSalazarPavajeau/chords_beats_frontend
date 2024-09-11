module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.13.0"

    
  # VPC Basic Details
  name = "vpc-dev"
  cidr = "10.0.0.0/16"   
  azs                 = ["us-east-1a"]
  public_subnets      = ["10.0.1.0/24"]

  # VPC DNS Parameters
  enable_dns_hostnames = true
  enable_dns_support = true

  public_subnet_tags = {
    Type = "public-subnets"
  }

  tags = {
    Owner = "terraform"
    Environment = "dev"
  }

  vpc_tags = {
    Name = "vpc-dev"
  }
  # Instances launched into the Public subnet should be assigned a public IP address.
  map_public_ip_on_launch = true
}