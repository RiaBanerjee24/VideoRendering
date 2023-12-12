import cv2
import os
import sys

def create_video(image_folder, output_filename, frame_rate):
    # Get the list of image files in the folder
    images = [img for img in os.listdir(image_folder) if img.endswith(".png")]
    frame = cv2.imread(os.path.join(image_folder, images[0]))
    height, width, layers = frame.shape

    # Define the codec and create VideoWriter object
    fourcc = cv2.VideoWriter_fourcc(*'mp4v') 
    video = cv2.VideoWriter(output_filename, fourcc, frame_rate, (width,height))

    for image in images:
        video.write(cv2.imread(os.path.join(image_folder, image)))

    # Release the VideoWriter object
    video.release()

    # Display a message once the video is created
    print("Video created successfully.")

# Example usage
if __name__ == '__main__':
    if len(sys.argv) != 4:
        print("Usage: python create_video.py <image_folder_path> <output_filename> <frame_rate>")
        sys.exit(1)

    image_folder = sys.argv[1]
    output_filename = sys.argv[2]
    frame_rate = float(sys.argv[3])

    create_video(image_folder, output_filename, frame_rate)
