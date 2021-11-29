const array1 = [
  {
    _id: "61a24ff8f2d6093f29bc817a",
    adminId: "61a24dccf2d6093f29bc8171",
    author: "Thamara",
    title: "La culpa es de la vaca",
    year: 2008,
    publisher: "Nómada",
    subject: "Autoayuda",
    numberOfPages: 150,
    createdAt: "2021-11-27T15:34:16.081Z",
    updatedAt: "2021-11-27T15:34:16.081Z",
    __v: 0,
    comments: [
      {
        _id: "61a253d89e297888e38904b4",
        user: "61a252359e297888e38904ac",
        book: "61a24ff8f2d6093f29bc817a",
        rating: 4.5,
        comment: "Prueba desde postman Thamara",
        createdAt: "2021-11-27T15:50:48.232Z",
        updatedAt: "2021-11-27T15:50:48.232Z",
        __v: 0,
      },
      {
        _id: "61a2548f9e297888e38904be",
        user: "61a254429e297888e38904b9",
        book: "61a24ff8f2d6093f29bc817a",
        rating: 4,
        comment: "Prueba Thamara user modificar comentario",
        createdAt: "2021-11-27T15:53:51.156Z",
        updatedAt: "2021-11-27T16:01:38.160Z",
        __v: 0,
      },
    ],
  },
  {
    _id: "61a250b1f2d6093f29bc817c",
    adminId: "61a24dccf2d6093f29bc8171",
    author: "J. K. Rowling",
    title: "Harry Potter y el Prisionero de Azkaban (Harry Potter 3)",
    year: 2020,
    publisher: "Salamandra",
    subject: "Ficción",
    numberOfPages: 338,
    bookImageUrl:
      "https://images.cdn1.buscalibre.com/fit-in/360x360/1a/31/1a3145c3ba83287fabdb65514b893cf6.jpg",
    createdAt: "2021-11-27T15:37:21.985Z",
    updatedAt: "2021-11-27T15:37:21.985Z",
    __v: 0,
    comments: [
      {
        _id: "61a27d07d4dd84197fb63c35",
        user: "61a254429e297888e38904b9",
        book: "61a250b1f2d6093f29bc817c",
        rating: 3,
        comment: "a Thamara le encanta Harry Potter",
        createdAt: "2021-11-27T18:46:31.857Z",
        updatedAt: "2021-11-27T18:46:31.857Z",
        __v: 0,
      },
    ],
  },
  {
    _id: "61a4fe4f9c6e76476d3b6c05",
    adminId: "61a24dccf2d6093f29bc8171",
    author: "juan el autor",
    title: "la vida de juan",
    year: 2021,
    publisher: "salamandra",
    subject: "Drama",
    numberOfPages: 600,
    bookImageUrl:
      "https://images.cdn3.buscalibre.com/fit-in/360x360/5a/09/5a090b47d5246ce27b83bb1606a934f4.jpg",
    createdAt: "2021-11-29T16:22:39.680Z",
    updatedAt: "2021-11-29T16:22:39.680Z",
    __v: 0,
    comments: [],
  },
];

const result = array1.map((ele) => ele.comments);
let result2 = result
  .flat()
  .map((ele) => ({ book: ele.book, rating: ele.rating, comment: ele.comment })).filter((ele) => );

console.log(result2);
