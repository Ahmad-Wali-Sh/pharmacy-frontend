import os
import socket

# Get the IP address of the current machine on the local network
ip_address = socket.gethostbyname(socket.gethostname())

# Update the API variable with the obtained IP address
api_url = f"http://{ip_address}:8000"
env_file_path = ".env"

# Read the .env file
with open(env_file_path, "r") as f:
    lines = f.readlines()

# Find and update the API line
updated_lines = []
for line in lines:
    if line.startswith("API"):
        updated_lines.append(f"API = {api_url}\n")
    else:
        updated_lines.append(line)

# Write the updated .env file
with open(env_file_path, "w") as f:
    f.writelines(updated_lines)