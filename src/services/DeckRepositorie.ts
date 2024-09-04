import { app } from "./api";

class DeckRepositorie {
  static async createDeck() {
    try {
      const response = await app.get("/new");
      return response.data.deck_id;
    } catch (error) {
      console.error("Não foi possível criar o deck: ", error);
    }
  }

  static async deckStatus(deckId: string) {
    try {
      const response = await app.get(`/${deckId}`);
      return response.data;
    } catch (error) {
      console.error(`Não foi visualizar o status do deck ${deckId}: `, error);
    }
  }

  static async drawCard(deckId: string, count: number) {
    try {
      const response = await app.get(`/${deckId}/draw/?count=${count}`);
      console.log("CARDS", response.data);
      return response.data;
    } catch (error) {
      console.error(`Não foi visualizar o status do deck ${deckId}: `, error);
    }
  }

  static async reshuffleCards(deckId: string) {
    try {
      const response = await app.get(`/${deckId}/shuffle/?remaining=true`);
      console.log("SHUFFLE", response.data);
      return response.data;
    } catch (error) {
      console.error(`Não foi visualizar o status do deck ${deckId}: `, error);
    }
  }

  static async addToPile(deckId: string, pileName: string, cards: string[]) {
    try {
      const response = await app.get(
        `/${deckId}/pile/${pileName}/add/?cards=${cards.join(",")}`
      );
      console.log("ADDTOPILE", response.data);
      return response.data;
    } catch (error) {
      console.error(`Não foi visualizar o status do deck ${deckId}: `, error);
    }
  }

  static async listCardsInPile(deckId: string, pileName: string) {
    try {
      const response = await app.get(`/${deckId}/pile/${pileName}/list/`);
      console.log("LISTPILE", response.data);
      return response.data;
    } catch (error) {
      console.error(`Não foi visualizar o status do deck ${deckId}: `, error);
    }
  }
}

export default DeckRepositorie;
