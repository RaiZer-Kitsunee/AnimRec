interface MediaRecommendationList {
  id: number;
  rating: number;
  mediaRecommendation: mediaRecommendation;
}

interface mediaRecommendation {
  id: number;
  title: title;
  coverImage: coverImage;
}

interface title {
  romaji: string;
}

interface coverImage {
  large: string;
}
