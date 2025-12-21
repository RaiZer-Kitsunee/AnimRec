interface MediaRelations {
  edges: MediaRelation[];
}

interface MediaRelation {
  relationType: string;
  node: RelationNode;
}

interface RelationNode {
  id: number;
  title: {
    romaji: string;
  };
  coverImage: MediaCoverImage;
  format: string;
}

