import sys
import json
import openai
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Get the OpenAI API key from the environment variable
api_key = os.getenv("OPENAI_API_KEY")
openai.api_key = api_key

def generate_response(prompt):
    try:
        response = openai.Completion.create(
            engine="davinci-codex",
            prompt=prompt,
            max_tokens=150,  # You can adjust this value to control the response length
        )

        if response.choices and len(response.choices) > 0:
            return response.choices[0].text.strip()
        else:
            return "Failed to generate a valid response."

    except Exception as e:
        return f"An error occurred: {str(e)}"

if __name__ == "__main__":
    # Check if the prompt is provided as a command-line argument
    if len(sys.argv) < 2:
        print("Error: Please provide a prompt as a command-line argument.")
        sys.exit(1)

    # Get the prompt from command-line arguments
    prompt = " ".join(sys.argv[1:])

    # Generate the response using ChatGPT
    response = generate_response(prompt)

    # Create a JSON object to represent the response
    response_data = {
        "prompt": prompt,
        "response": response
    }

    # Print the response in JSON format
    print(json.dumps(response_data))
