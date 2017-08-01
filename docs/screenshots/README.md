### POST /connection

- No error condition

[![IMAGE ALT TEXT](#)](https://github.com/serganus/mySocialNetworkAPI/tree/master/docs/screenshots/connections/POST.png?token=AMWMA_mM7xqM8G7XMQ3wbEB0QhF5kZixks5ZiesSwA%3D%3D)

- Error conditions
   - Condition 1: `req.body.friends` is empty.
   [![IMAGE ALT TEXT](#)](https://github.com/serganus/mySocialNetworkAPI/tree/master/docs/screenshots/connections/Error_conditions/POST_ErrorCondition_01.png?token=AMWMA_mM7xqM8G7XMQ3wbEB0QhF5kZixks5ZiesSwA%3D%3D)
   - Condition 2: `req.body.friends` doesnt have two email addresses.
   [![IMAGE ALT TEXT](#)](https://github.com/serganus/mySocialNetworkAPI/tree/master/docs/screenshots/connections/Error_conditions/POST_ErrorCondition_02.png?token=AMWMA_mM7xqM8G7XMQ3wbEB0QhF5kZixks5ZiesSwA%3D%3D)
   - Condition 3: `req.body.friends` first two elements are not strings.
   [![IMAGE ALT TEXT](#)](https://github.com/serganus/mySocialNetworkAPI/tree/master/docs/screenshots/connections/Error_conditions/POST_ErrorCondition_03.png?token=AMWMA_mM7xqM8G7XMQ3wbEB0QhF5kZixks5ZiesSwA%3D%3D)
   - Condition 4: `req.body.friends` has more than two values.
   [![IMAGE ALT TEXT](#)](https://github.com/serganus/mySocialNetworkAPI/tree/master/docs/screenshots/connections/Error_conditions/POST_ErrorCondition_04.png?token=AMWMA_mM7xqM8G7XMQ3wbEB0QhF5kZixks5ZiesSwA%3D%3D)

### GET /connection

[![IMAGE ALT TEXT](#)](https://github.com/serganus/mySocialNetworkAPI/tree/master/docs/screenshots/connections/GET.png?token=AMWMA_mM7xqM8G7XMQ3wbEB0QhF5kZixks5ZiesSwA%3D%3D)

### POST /friends

[![IMAGE ALT TEXT](#)]()


### GET /friends

[![IMAGE ALT TEXT](#)]()


### POST /friends/common

[![IMAGE ALT TEXT](#)]()


### POST /updates/subscribe

[![IMAGE ALT TEXT](#)]()


### POST /updates/block

[![IMAGE ALT TEXT](#)]()


### POST /updates/emails

[![IMAGE ALT TEXT](#)]()

