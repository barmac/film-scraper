export class Film {
  constructor(
    private title: string,
    private averageRating: number,
  ) { }

  toJson(): { title: string, averageRating: number } {
    return {
      title: this.title,
      averageRating: this.averageRating,
    };
  }
}
