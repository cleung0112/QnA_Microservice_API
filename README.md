# Question And Answer Microservice API

## List Questions
```
GET /qa/questions 
```

Retrieves a list of questions for a particular product. This list does not include any reported questions.

### Parameters

Parameter          |  Type   | Description
:-------------------------:|:-------------------------: |:-------------------------:
product_id  | integer | Specifies the product for which to retrieve questions.
page  | integer | Selects the page of results to return. Default 1.
count  | integer | Specifies how many results per page to return. Default 5.

### Response
Status: 200 OK
```
{
  "product_id": "5",
  "results": [{
        "question_id": 37,
        "question_body": "Why is this product cheaper here than other sites?",
        "question_date": "2018-10-18T00:00:00.000Z",
        "asker_name": "williamsmith",
        "question_helpfulness": 4,
        "reported": false,
        "answers": {
          68: {
            "id": 68,
            "body": "We are selling it here without any markup from the middleman!",
            "date": "2018-08-18T00:00:00.000Z",
            "answerer_name": "Seller",
            "helpfulness": 4,
            "photos": []
            // ...
          }
        }
      },
      {
        "question_id": 38,
        "question_body": "How long does it last?",
        "question_date": "2019-06-28T00:00:00.000Z",
        "asker_name": "funnygirl",
        "question_helpfulness": 2,
        "reported": false,
        "answers": {
          70: {
            "id": 70,
            "body": "Some of the seams started splitting the first time I wore it!",
            "date": "2019-11-28T00:00:00.000Z",
            "answerer_name": "sillyguy",
            "helpfulness": 6,
            "photos": [],
          },
          78: {
            "id": 78,
            "body": "9 lives",
            "date": "2019-11-12T00:00:00.000Z",
            "answerer_name": "iluvdogz",
            "helpfulness": 31,
            "photos": [],
          }
        }
      },
      // ...
  ]
}
```


## Answers List
```
GET /qa/questions/:question_id/answers
```
Returns answers for a given question. This list does not include any reported answers.

### Parameters

Parameter          |  Type   | Description
:-------------------------:|:-------------------------: |:-------------------------:
product_id  | integer | Required ID of the question for wich answers are needed

### Query Parameters

Parameter          |  Type   | Description
:-------------------------:|:-------------------------: |:-------------------------:
page  | integer | Selects the page of results to return. Default 1.
count  | integer | Specifies how many results per page to return. Default 5.

### Response
Status: 200 OK
```
{
  "question": "1",
  "page": 0,
  "count": 5,
  "results": [
    {
      "answer_id": 8,
      "body": "What a great question!",
      "date": "2018-01-04T00:00:00.000Z",
      "answerer_name": "metslover",
      "helpfulness": 8,
      "photos": [],
    },
    {
      "answer_id": 5,
      "body": "Something pretty durable but I can't be sure",
      "date": "2018-01-04T00:00:00.000Z",
      "answerer_name": "metslover",
      "helpfulness": 5,
      "photos": [{
          "id": 1,
          "url": "urlplaceholder/answer_5_photo_number_1.jpg"
        },
        {
          "id": 2,
          "url": "urlplaceholder/answer_5_photo_number_2.jpg"
        },
        // ...
      ]
    },
    // ...
  ]
}
```


## Add a Question
```
POST /qa/questions
```
Adds a question for the given product

### Body Parameters

Parameter          |  Type   | Description
:-------------------------:|:-------------------------: |:-------------------------:
product_id  | integer | Required ID of the Product for which the question is posted
body	| text	| Text of question being asked
name	| text	| Username for question asker
email	| text	| Email address for question asker

### Response
Status: 201 CREATED


## Add an Answer
```
POST /qa/questions/:question_id/answers
```
Adds an answer for the given question


### Body Parameters


Parameter          |  Type   | Description
:-------------------------:|:-------------------------: |:-------------------------:
question_id  | integer | Required ID of the question to post the answer for
body	| text	| Text of question being asked
name	| text	| Username for question asker
email	| text	| Email address for question asker
photos	| [text] |	An array of urls corresponding to images to display

### Response
Status: 201 CREATED

