export type Artist = {
  _id: string;
  name: string;
  bio: string;
  avatarUrl: string;
  coverUrl: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    youtube: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type ArtistList = {
  artists: Artist[];
};
