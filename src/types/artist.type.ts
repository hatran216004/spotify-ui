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
  isFollowed: boolean;
  followedAt?: string;
};

export type ArtistList = {
  artists: Artist[];
};

export type FollowState = {
  artistId: string;
  userId: string;
  isFollowed: boolean;
  followedAt?: string;
  status: 'already_unfollowed' | 'unfollowed' | 'new_follow';
};

export type ArtistFollowItem = Pick<Artist, '_id' | 'avatarUrl' | 'name'>;

export type ArtistFollows = {
  artistFollows: ArtistFollowItem[];
};
