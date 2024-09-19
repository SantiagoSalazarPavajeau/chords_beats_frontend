variable "aws_instance_ami" {
  description = "AWS t2.micro free tier instance AMI"
  type = string
  default = "ami-0182f373e66f89c85"
}

variable "aws_instance_type" {
  description = "AWS t2.micro free tier instance type"
  type = string
  default = "t2.micro"
}
variable "instance_keypair" {
  description = "AWS EC2 Key pair that need to be associated with EC2 Instance"
  type = string
  default = "eks-terraform-key"
}