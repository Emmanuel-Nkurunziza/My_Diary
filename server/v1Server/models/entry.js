export class Entry {
  constructor(entryId, entryTitle, entryDate, entryDescription, userId) {
    this.id = entryId;
    this.title = entryTitle;
    this.date = entryDate;
    this.description = entryDescription;
    this.userId = userId;
  }
}
