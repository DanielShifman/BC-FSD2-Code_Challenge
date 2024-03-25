# Start from the official Go image.
FROM golang:1.21.3

# Set the Current Working Directory inside the container.
WORKDIR /app

# Copy go.mod and go.sum files to the workspace.
COPY go.mod go.sum ./

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed.
RUN go mod download

# Copy the source from the current directory to the Working Directory inside the container.
COPY . .

# Build the application.
RUN CGO_ENABLED=0 GOOS=linux go build -v -o server

# Expose port 8080 to the outside world.
# Google Cloud Run will map incoming HTTP requests to the port defined by the PORT environment variable.
EXPOSE 8080

# Command to run the application.
CMD ["/app/server"]