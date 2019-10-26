export class Entry {
  constructor(entryId, entryTitle, entryDate, entryDescription, userEmail) {
    this.id = entryId;
    this.title = entryTitle;
    this.date = entryDate;
    this.description = entryDescription;
    this.userEmail = userEmail;
  }
}
