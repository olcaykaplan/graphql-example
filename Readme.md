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