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