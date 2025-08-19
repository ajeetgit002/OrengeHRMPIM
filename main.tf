provider "aws" {
  region = "us-west-2"
}

data "aws_ami" "linux" {
  most_recent = true

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-2.0.*-x86_64-ebs"]
  }

  owners = ["137112412989"] # Amazon
}

resource "aws_instance" "example" {
  ami           = data.aws_ami.linux.id
  instance_type = "t2.micro"

  tags = {
    Name = "ExampleInstance"
  }
}

output "instance_public_ip" {
  description = "Public IP of the EC2 instance"
  value       = aws_instance.example.public_ip
}
