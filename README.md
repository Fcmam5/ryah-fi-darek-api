<div dir="rtl">
  <h1>ريّح في دارك</h1>
</div>

API for encouraging Algerians to stay at home during COVID-19 pandemic.

We will expose some ideas, advices and helpful resources to encourage people to stay at home
and what can they do during that period to make it more fun and productive (e.g. Learning things online for free, ideas for offline activities, resources for home-schooling), and we will expose some content for content creators (quotes, videos, infographics..)

## Categories

### 1. Things to do while staying at home

Endpoint : `GET /tips`

#### Get resources for a specific `item`

Endpoint `GET /tips/:category`, it returns a list of helpful resources for a specific element, e.g. `GET /tips/sport`:

```json
Response:
[
  {
    "title": "Routine Sans Matériel à Faire à la Maison",
    "link": "https://youtu.be/vTIyTC0qWXw",
    "type": "video",
    "language": "french"
  },
  {
    "title": "Home Workout - No Equipment",
    "link": "https://play.google.com/store/apps/details?id=homeworkout.homeworkouts.noequipment",
    "type": "androidApp",
    "language": "english"
  }
  ...
]
```

You can also filter the results with `language` and `type`, e.g.: `GET /tips/sport?language=arabic&type=video`

_tbd..._

### 2. Kids

As keeping children during this period could be the hardest part, we provide a content for kids and for parents

#### 2.1 Schooling

How they could study at home

#### 2.2 Fun

Online and offline games :)

#### 2.3 Watch

Cartoons or educational content

### 3. Why you should stay at home

Collection of helpful (and ideally fun-to-follow) resources from trusted sources.

### 4. Social media content

Collection of quotes and things to post on social media to encourage people to stay at home.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details
