const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: '1',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '2',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://example.com/',
    likes: 5,
    __v: 0
  },
  {
    _id: '3',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://example.com/',
    likes: 12,
    __v: 0
  },
  {
    _id: '4',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://example.com/',
    likes: 10,
    __v: 0
  },
  {
    _id: '5',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://example.com/',
    likes: 0,
    __v: 0
  }
]

describe('favorite blog', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]
  
    const listWithMultipleBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'First Blog',
        author: 'Author One',
        url: 'http://example.com/first',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f9',
        title: 'Second Blog',
        author: 'Author Two',
        url: 'http://example.com/second',
        likes: 10,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17fa',
        title: 'Third Blog',
        author: 'Author Three',
        url: 'http://example.com/third',
        likes: 0,
        __v: 0
      }
    ]
  
    test('when list is empty, returns null', () => {
      const result = listHelper.favoriteBlog([])
      expect(result).toBe(null)
    })
  
    test('when list has only one blog, returns that blog', () => {
      const result = listHelper.favoriteBlog(listWithOneBlog)
      expect(result).toEqual({
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5
      })
    })
  
    test('when list has multiple blogs, returns the author with most blogs', () => {
        const result = listHelper.mostBlogs(listWithMultipleBlogs);
        expect(result).toEqual({
          author: 'Author One',
          blogs: 3
        });    
    })
  })
  

describe('dummy', () => {
  test('dummy returns one', () => {
    const result = listHelper.dummy([])
    expect(result).toBe(1)
  })
})

describe('totalLikes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes([blogs[0]])
    expect(result).toBe(7)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(34)
  })
})

describe('favoriteBlog', () => {
  test('when list is empty, return null', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(null)
  })

  test('when list has one blog, return that blog', () => {
    const result = listHelper.favoriteBlog([blogs[0]])
    expect(result).toEqual(blogs[0])
  })

  test('when list has multiple blogs, return the one with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })
})

describe('mostBlogs', () => {
  test('when list is empty, return null', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(null)
  })

  test('when list has multiple blogs, return the author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 2 })
  })
})

describe('most likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ];
  
    const listWithMultipleBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'First Blog',
        author: 'Author One',
        url: 'http://example.com/first',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f9',
        title: 'Second Blog',
        author: 'Author Two',
        url: 'http://example.com/second',
        likes: 10,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17fa',
        title: 'Third Blog',
        author: 'Author One',
        url: 'http://example.com/third',
        likes: 0,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17fb',
        title: 'Fourth Blog',
        author: 'Author Two',
        url: 'http://example.com/fourth',
        likes: 2,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17fc',
        title: 'Fifth Blog',
        author: 'Author One',
        url: 'http://example.com/fifth',
        likes: 7,
        __v: 0
      }
    ];
  
    test('when list is empty, returns null', () => {
      const result = listHelper.mostLikes([]);
      console.log('Author with most likes (empty list):', result);
      expect(result).toBe(null);
    });
  
    test('when list has only one blog, returns the author of that blog', () => {
      const result = listHelper.mostLikes(listWithOneBlog);
      console.log('Author with most likes (one blog):', result);
      expect(result).toEqual({
        author: 'Edsger W. Dijkstra',
        likes: 5
      });
    });
  
    test('when list has multiple blogs, returns the author with most likes', () => {
      const result = listHelper.mostLikes(listWithMultipleBlogs);
      console.log('Author with most likes (multiple blogs):', result);
      expect(result).toEqual({
        author: 'Author Two',
        likes: 12
      });
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
        __v: 0
      }
    ]
  
    const listWithMultipleBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'First Blog',
        author: 'Author One',
        url: 'http://example.com/first',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f9',
        title: 'Second Blog',
        author: 'Author Two',
        url: 'http://example.com/second',
        likes: 10,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17fa',
        title: 'Third Blog',
        author: 'Author Three',
        url: 'http://example.com/third',
        likes: 0,
        __v: 0
      }
    ]
  
    test('when list has only one blog, equals the likes of that blog', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
  
    test('when list is empty, equals zero', () => {
      const result = listHelper.totalLikes([])
      expect(result).toBe(0)
    })
  
    test('when list has multiple blogs, equals the total likes of all', () => {
      const result = listHelper.totalLikes(listWithMultipleBlogs)
      expect(result).toBe(15)  // 5 + 10 + 0
    })
  })
  
