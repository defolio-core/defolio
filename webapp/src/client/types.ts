export interface User {
  address: string;
}

export interface Space {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  address: string; 
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  cover: string;
  content: string;
  authorAddress: string;
  spaceId: string;
}
