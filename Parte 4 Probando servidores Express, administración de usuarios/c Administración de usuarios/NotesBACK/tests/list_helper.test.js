const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Note = require('../models/note')

beforeEach(async () => {
  await Note.deleteMany({})

  let noteObject = new Note(helper.initialNotes[0])
  await noteObject.save()

  noteObject = new Note(helper.initialNotes[1])
  await noteObject.save()
})

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/notes')

   assert.strictEqual(response.body.length, helper.initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(r => r.content)

  assert(contents.includes('Browser can execute only JavaScript'))
})

test('a valid note can be added ', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const notesAtEnd = await helper.notesInDb()
  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

  const contents = notesAtEnd.map(n => n.content)
  assert(contents.includes('async/await simplifies making async calls'))
})

test('note without content is not added', async () => {
  const newNote = {
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  const notesAtEnd = await helper.notesInDb()

  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
})

after(async () => {
  await mongoose.connection.close()
})
/* 
describe('listHelper', () => {
  test('dummy returns one', () => {
    const blogs = []; 

    const result = listHelper.dummy(blogs);
    assert.strictEqual(result, 1);
  });
});

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0,
      },
    ];
  
    const listWithMultipleBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0,
      },
      {
        _id: '5a422aa71b54a676234d17f9',
        title: 'React Patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 10,
        __v: 0,
      },
      {
        _id: '5a422aa71b54a676234d17fa',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 15,
        __v: 0,
      },
    ];
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog);
      assert.strictEqual(result, 5);
    });
  
    test('when list has multiple blogs, equals the sum of likes', () => {
      const result = listHelper.totalLikes(listWithMultipleBlogs);
      assert.strictEqual(result, 30); // 5 + 10 + 15 = 30
    });
  
    test('when list is empty, equals zero', () => {
      const result = listHelper.totalLikes([]);
      assert.strictEqual(result, 0);
    });
  });

  // Nuevas pruebas para favoriteBlog
describe('favorite blog', () => {
    const listWithMultipleBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0,
      },
      {
        _id: '5a422aa71b54a676234d17f9',
        title: 'React Patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 10,
        __v: 0,
      },
      {
        _id: '5a422aa71b54a676234d17fa',
        title: 'The Dark Side of React',
        author: 'Jane Doe',
        url: 'https://example.com/dark-side-react',
        likes: 15,
        __v: 0,
      },
    ];
  
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0,
      },
    ];
  
    test('when list has multiple blogs, returns the blog with most likes', () => {
      const result = listHelper.favoriteBlog(listWithMultipleBlogs);
      const expected = {
        title: 'The Dark Side of React',
        author: 'Jane Doe',
        likes: 15,
      };
      assert.deepStrictEqual(result, expected);
    });
  
    test('when list has only one blog, returns that blog', () => {
      const result = listHelper.favoriteBlog(listWithOneBlog);
      const expected = {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5,
      };
      assert.deepStrictEqual(result, expected);
    });
  
    test('when list is empty, returns null', () => {
      const result = listHelper.favoriteBlog([]);
      assert.strictEqual(result, null);
    });
    test('when list has multiple blogs, returns the author with the most blogs', () => {
        const result = listHelper.mostBlogs(listWithMultipleBlogs);
        const expected = {
          author: 'Michael Chan',
          blogs: 2, // Michael Chan tiene 2 blogs
        };
        assert.deepStrictEqual(result, expected);
      });
      test('when list has only one blog, returns that author with count 1', () => {
        const listWithOneBlog = [
          {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0,
          },
        ];
    
        const result = listHelper.mostBlogs(listWithOneBlog);
        const expected = {
          author: 'Edsger W. Dijkstra',
          blogs: 1,
        };
        assert.deepStrictEqual(result, expected);
      });
    
      test('when list is empty, returns null', () => {
        const result = listHelper.mostBlogs([]);
        assert.strictEqual(result, null);
      });
    });
    // Nuevas pruebas para mostBlogs
describe('most blogs', () => {
    const listWithMultipleBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0,
      },
      {
        _id: '5a422aa71b54a676234d17f9',
        title: 'React Patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 10,
        __v: 0,
      },
      {
        _id: '5a422aa71b54a676234d17fa',
        title: 'The Dark Side of React',
        author: 'Jane Doe',
        url: 'https://example.com/dark-side-react',
        likes: 15,
        __v: 0,
      },
      {
        _id: '5a422aa71b54a676234d17fb',
        title: 'Another Blog',
        author: 'Michael Chan',
        url: 'https://example.com/another-blog',
        likes: 8,
        __v: 0,
      },
    ];
  
    test('when list has multiple blogs, returns the author with the most blogs', () => {
      const result = listHelper.mostBlogs(listWithMultipleBlogs);
      const expected = {
        author: 'Michael Chan',
        blogs: 2, // Michael Chan tiene 2 blogs
      };
      assert.deepStrictEqual(result, expected);
    });
  
    test('when list has only one blog, returns that author with count 1', () => {
      const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
          likes: 5,
          __v: 0,
        },
      ];
  
      const result = listHelper.mostBlogs(listWithOneBlog);
      const expected = {
        author: 'Edsger W. Dijkstra',
        blogs: 1,
      };
      assert.deepStrictEqual(result, expected);
    });
  
    test('when list is empty, returns null', () => {
      const result = listHelper.mostBlogs([]);
      assert.strictEqual(result, null);
    }); 
  }); */
  
