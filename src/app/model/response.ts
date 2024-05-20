export class books {
  name: string;
  price: string;
  description: string;
}

export class addBook {
  message: string;
}

export class allBooks {
  message: string;
  data: {
    _id: string;
    name: string;
    price: string;
    description: string;
    __v: 0;
    image: string;
  };
}

export class updateBook {
  message: string;
}

export class deleteBooks {
  message: string;
}
