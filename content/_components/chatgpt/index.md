---
title: ChatGPT component
layout: component
section: Service components
description: ChatGPT Component is designed to connect with ChatGPT
icon: chatgpt.png
icontext: ChatGPT component
category: chatgpt
updatedDate: 2024-05-08
ComponentVersion: 1.1.0
---

## Description

ChatGPT Component is designed to connect with ChatGPT using [REST OpenAI API](https://platform.openai.com/docs/api-reference/introduction) The current release of component tested with the `Nov 6th, 2023` [API version](https://platform.openai.com/docs/changelog).

## Credentials

First, [Create OpenAI account](https://platform.openai.com/signup) or [Sign in](https://platform.openai.com/login). Next, navigate to the [API key page](https://platform.openai.com/account/api-keys) and *Create new secret key*, optionally naming the key. Make sure to save this somewhere safe and do not share it with anyone.

* **API Key** (string, required) - API Token generated as described above.

## Triggers

This component does not have trigger functions, making it inaccessible as the first component during the integration flow design.

## Actions

### Send Request

Simply send a request. Only text-based models are supported so far (gpt-4 and gpt-3.5). Stream mode is not supported currently.

#### Configuration Fields

* **Organization** (string, optional) - For users who belong to multiple organizations, you can pass a header to specify which organization is used for an API request. Usage from these API requests will count as usage for the specified organization. Leave it blank if you only belong to one organization.
* **Select model** (dropdown, required) - A dynamic list of the models available in your account. Only text-based GPT models are supported so far.
* **API call request timeout, in seconds** (dropdown, optional) - Depending on the input text complexity it might take long time for the API to generate a response and reply. It can easily take up to 40-60 seconds. If you are getting timeout errors, increase this value. Defaults to 60 seconds.

#### Input Metadata

Please refer to the Input Schema file below for the full list of metadata fields. 
<details close markdown="block"><summary><strong>Input Schema file</strong></summary>
```json
{
  "type": "object",
  "properties": {
    "messages": {
      "type": "array",
      "help": {
        "description": "A list of messages comprising the conversation so far"
      },
      "required": true,
      "items": {
        "type": "object",
        "properties": {
          "role": {
            "type": "string",
            "help": {
              "description": "The role of the messages author, in this case system"
            },
            "required": true,
            "enum": [
              "system",
              "user",
              "assistant",
              "tool",
              "function"
            ]
          },
          "content": {
            "type": "string",
            "help": {
              "description": "The contents of the message"
            },
            "required": true
          },
          "name": {
            "type": "string",
            "help": {
              "description": "The contents of the message"
            },
            "required": false
          },
          "tool_call_id": {
            "type": "string",
            "help": {
              "description": "Tool call that this message is responding to"
            },
            "required": false
          }
        }
      }
    },
    "frequency_penalty": {
      "type": "number",
      "help": {
        "description": "Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim"
      },
      "required": false
    },
    "logit_bias": {
      "type": "object",
      "help": {
        "description": "Modify the likelihood of specified tokens appearing in the completion. Accepts a JSON object that maps tokens (specified by their token ID in the tokenizer) to an associated bias value from -100 to 100. Mathematically, the bias is added to the logits generated by the model prior to sampling. The exact effect will vary per model, but values between -1 and 1 should decrease or increase likelihood of selection; values like -100 or 100 should result in a ban or exclusive selection of the relevant token"
      },
      "required": false
    },
    "max_tokens": {
      "type": "number",
      "help": {
        "description": "The maximum number of tokens to generate in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length"
      },
      "required": false
    },
    "n": {
      "type": "number",
      "help": {
        "description": "How many chat completion choices to generate for each input message. Note that you will be charged based on the number of generated tokens across all of the choices. Keep n as 1 to minimize costs"
      },
      "required": false
    },
    "presence_penalty": {
      "type": "number",
      "help": {
        "description": "Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics"
      },
      "required": false
    },
    "response_format": {
      "type": "object",
      "help": {
        "description": "An object specifying the format that the model must output. Setting to { \"type\": \"json_object\" } enables JSON mode, which guarantees the message the model generates is valid JSON. Important: when using JSON mode, you must also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly \"stuck\" request. Also note that the message content may be partially cut off if 'finish_reason=\"length\"', which indicates the generation exceeded 'max_tokens' or the conversation exceeded the max context length"
      },
      "required": false,
      "properties": {
        "type": {
          "type": "string",
          "help": {
            "description": "Must be one of 'text' or 'json_object'"
          },
          "required": false,
          "enum": [
            "text",
            "json_object"
          ]
        }
      }
    },
    "seed": {
      "type": "number",
      "help": {
        "description": "This feature is in Beta. If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same seed and parameters should return the same result. Determinism is not guaranteed, and you should refer to the 'system_fingerprint' response parameter to monitor changes in the backend"
      },
      "required": false
    },
    "stop": {
      "type": "object",
      "help": {
        "description": "Up to 4 sequences where the API will stop generating further tokens"
      },
      "required": false
    },
    "stream": {
      "type": "boolean",
      "help": {
        "description": "If set, partial message deltas will be sent, like in ChatGPT. Tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a data: [DONE] message"
      },
      "required": false
    },
    "temperature": {
      "type": "number",
      "help": {
        "description": "What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. We generally recommend altering this or 'top_p' but not both"
      },
      "required": false
    },
    "top_p": {
      "type": "number",
      "help": {
        "description": "An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. We generally recommend altering this or 'temperature' but not both"
      },
      "required": false
    },
    "tools": {
      "type": "array",
      "help": {
        "description": "A list of tools the model may call. Currently, only functions are supported as a tool. Use this to provide a list of functions the model may generate JSON inputs for"
      },
      "required": false,
      "items": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "help": {
              "description": "The type of the tool. Currently, only function is supported"
            },
            "required": false
          },
          "function": {
            "type": "object",
            "required": false,
            "properties": {
              "description": {
                "type": "string",
                "help": {
                  "description": "A description of what the function does, used by the model to choose when and how to call the function"
                },
                "required": false
              },
              "name": {
                "type": "string",
                "help": {
                  "description": "The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64"
                },
                "required": false
              },
              "parameters": {
                "type": "object",
                "help": {
                  "description": "The parameters the functions accepts, described as a JSON Schema object. See the guide for examples, and the JSON Schema reference for documentation about the format. To describe a function that accepts no parameters, provide the value {\"type\": \"object\", \"properties\": {}}"
                },
                "required": false
              }
            }
          }
        }
      }
    },
    "tool_choice": {
      "type": "object",
      "help": {
        "description": "Controls which (if any) function is called by the model. none means the model will not call a function and instead generates a message. auto means the model can pick between generating a message or calling a function. Specifying a particular function via {\"type: \"function\", \"function\": {\"name\": \"my_function\"}} forces the model to call that function. 'none' is the default when no functions are present. 'auto' is the default if functions are present"
      },
      "required": false
    },
    "user": {
      "type": "string",
      "help": {
        "description": "A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse"
      },
      "required": false
    },
    "function_call": {
      "type": "object",
      "help": {
        "description": "Deprecated in favor of tool_choice. Controls which (if any) function is called by the model. none means the model will not call a function and instead generates a message. auto means the model can pick between generating a message or calling a function. Specifying a particular function via {\"name\": \"my_function\"} forces the model to call that function. 'none' is the default when no functions are present. 'auto' is the default if functions are present."
      },
      "required": false
    },
    "functions": {
      "type": "object",
      "help": {
        "description": "Deprecated in favor of tools. A list of functions the model may generate JSON inputs for"
      },
      "required": false,
      "properties": {
        "description": {
          "type": "string",
          "help": {
            "description": "A description of what the function does, used by the model to choose when and how to call the function"
          },
          "required": false
        },
        "name": {
          "type": "string",
          "help": {
            "description": "The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64"
          },
          "required": false
        },
        "parameters": {
          "type": "object",
          "help": {
            "description": "The parameters the functions accepts, described as a JSON Schema object. See the guide for examples, and the JSON Schema reference for documentation about the format. To describe a function that accepts no parameters, provide the value {\"type\": \"object\", \"properties\": {}}"
          },
          "required": false
        }
      }
    }
  }
}
```
</details>

The metadata is rather general for different use-cases. To build a correct request please consult the [official documentation](https://platform.openai.com/docs/api-reference/chat/create).

Here is an example of a very basic valid request:

```json
{
  "messages": [
    {
      "role": "user",
      "content": "Hi there, what is your name?"
    }
  ]
}
```

#### Output Metadata

Please refer to the [Output Schema file](https://github.com/elasticio/chatgpt-component/blob/master/src/schemas/actions/sendRequest.out.json) for the full list of metadata fields.
