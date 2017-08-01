### POST /connection

- No error condition

[![IMAGE ALT TEXT](#)](https://github.com/serganus/mySocialNetworkAPI/tree/master/docs/screenshots/connections/POST/success.png)

- Error conditions
   - Condition 1: `req.body.friends` is empty.
   [![IMAGE ALT TEXT](#)](https://github.com/serganus/mySocialNetworkAPI/tree/master/docs/screenshots/connections/POST/ErrorCondition_01.png)
   - Condition 2: `req.body.friends` doesnt have two email addresses.
   [![IMAGE ALT TEXT](#)](https://github.com/serganus/mySocialNetworkAPI/tree/master/docs/screenshots/connections/POST/ErrorCondition_02.png)
   - Condition 3: `req.body.friends` first two elements are not strings.
   [![IMAGE ALT TEXT](#)](https://github.com/serganus/mySocialNetworkAPI/tree/master/docs/screenshots/connections/POST/ErrorCondition_03.png)
   - Condition 4: `req.body.friends` has more than two values.
   [![IMAGE ALT TEXT](#)](https://github.com/serganus/mySocialNetworkAPI/tree/master/docs/screenshots/connections/POST/ErrorCondition_04.png)

### GET /connection

[![IMAGE ALT TEXT](#)](https://github.com/serganus/mySocialNetworkAPI/tree/master/docs/screenshots/connections/GET.png)

### POST /friends

- Consider that connections already made in the system are as follows

[![IMAGE ALT TEXT](#)](https://github.com/serganus/mySocialNetworkAPI/tree/master/docs/screenshots/friends/POST/GET_connections.png)

- No error condition

[![IMAGE ALT TEXT](#)](https://github.com/serganus/mySocialNetworkAPI/tree/master/docs/screenshots/friends/POST/success.png)

- Error conditions
   - Condition 1: `req.body.email` should exists and  be defined
   [![IMAGE ALT TEXT](#)](https://github.com/serganus/mySocialNetworkAPI/tree/master/docs/screenshots/friends/POST/ErrorCondition_02.png)
   - Condition 2: `req.body.email` should of type string
   [![IMAGE ALT TEXT](#)](https://github.com/serganus/mySocialNetworkAPI/tree/master/docs/screenshots/friends/POST/ErrorCondition_01.png)


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

