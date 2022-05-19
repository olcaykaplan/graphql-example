## Example 2
 Written 3 mutations; create, update and delete for all types (User, Event, Location, Participant)
 Mutations allow you to modify server-side data, and it also returns an object based on the operation performed. It can be used to insert, update, or delete data.

```javascript
mutation addNewUser {
  createUser(data: { username: "leblebici", email: "sungurlu@hotmail.com" }){
    id
    username
    email
    events {
      desc
    }
  }
}
mutation updateUserByID {
  updateUser(
    id: "J5bUSBzexPe_rbmtBGl1a"
    data: { email: "corum-sungurlu2@hotmail.com" }
  ){
    id
    username
    email
    events {
      id
      title
      desc
      location{id name}
      participants{id, user{id username}, event{id, title, desc}}
    }
  }
}
```

## Example 1
There are 4 types (User, Event, Location, Participant)
And they connected to each other on ids

```javascript
//example query
query getEvent {
  event(id: 4) {
    id
    title
    desc
    user {
      id
      username
      email
      events {
        id
        title
        desc
      }
    }
    location {
      id
      name
      desc
    }
  }
}
```