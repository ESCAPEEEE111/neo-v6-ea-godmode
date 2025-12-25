# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code into the container
COPY . .

# Make port 8001 available to the world outside this container
EXPOSE 8001

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8001"]
