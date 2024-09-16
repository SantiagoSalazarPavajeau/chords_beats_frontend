resource "aws_instance" "app_server" {
  ami           = var.aws_instance_ami
  instance_type = var.aws_instance_type

  tags = {
    Name = "ExampleAppServerInstance"
  }
}

resource "aws_instance" "nat" {
  ami           = var.aws_instance_ami
  instance_type = var.aws_instance_type
  tags = {
    Name = "NAT Instance"
  }
}
