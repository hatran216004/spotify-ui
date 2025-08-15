export type Artist = {
  socialLinks: {
    facebook: string;
    instagram: string;
    youtube: string;
  };
  _id: string;
  name: string;
  bio: string;
  avatarUrl: string;
  coverUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type ArtistList = {
  artists: Artist[];
};
