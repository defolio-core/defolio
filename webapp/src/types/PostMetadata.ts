export interface PostMetadata {
  title: string;
  slug: string;
  cover: string;
  content: string;
  author?: {
    address?: string;
  }
}
