interface MediaCharacters {
  edges: MediaCharacter[];
}

interface MediaCharacter {
  role: string;
  node: CharacterNode;
}

interface CharacterNode {
  id: number;
  name: CharacterName;
  image: CharacterImage;
}

interface CharacterName {
  full: string;
}
interface CharacterImage {
  large: string;
}
