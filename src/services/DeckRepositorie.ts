import { app } from "./api";

class DeckRepositorie {
  static async createDeck() {
    try {
      const response = await app.get("/new");
      return response.data.deck_id;
    } catch (error) {
      console.error("Erro ao criar um novo deck. Verifique sua conexão.");
    }
  }

  static async deckStatus(deckId: string) {
    try {
      const response = await app.get(`/${deckId}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erro ao obter o status do deck ${deckId}. Verifique sua conexão.`
      );
    }
  }

  static async drawCard(deckId: string, count: number) {
    try {
      const response = await app.get(`/${deckId}/draw/?count=${count}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erro ao comprar cartas do deck ${deckId}. Verifique sua conexão.`
      );
    }
  }

  static async reshuffleCards(deckId: string) {
    try {
      const response = await app.get(`/${deckId}/shuffle/?remaining=true`);
      return response.data;
    } catch (error) {
      console.error(
        `Erro ao reorganizar o deck ${deckId}. Verifique sua conexão.`
      );
    }
  }

  static async addToPile(deckId: string, pileName: string, cards: string[]) {
    try {
      const response = await app.get(
        `/${deckId}/pile/${pileName}/add/?cards=${cards.join(",")}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Erro ao adicionar cartas à pilha "${pileName}" no deck ${deckId}. Verifique sua conexão.`
      );
    }
  }

  static async drawFromPile(deckId: string, pileName: string, count: number) {
    try {
      const response = await app.get(
        `/${deckId}/pile/${pileName}/draw/?count=${count}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Erro ao comprar cartas da pilha "${pileName}" no deck ${deckId}. Verifique sua conexão.`
      );
    }
  }

  static async listCardsInPile(deckId: string, pileName: string) {
    try {
      const response = await app.get(`/${deckId}/pile/${pileName}/list/`);
      return response.data;
    } catch (error) {
      console.error(
        `Erro ao listar as cartas da pilha "${pileName}" no deck ${deckId}. Verifique sua conexão.`
      );
    }
  }

  static async returnCardsInPile(deckId: string, pileName: string) {
    try {
      const response = await app.get(`/${deckId}/pile/${pileName}/return/`);
      return response.data;
    } catch (error) {
      console.error(
        `Erro ao retornar cartas para a pilha "${pileName}" no deck ${deckId}. Verifique sua conexão.`
      );
    }
  }
}

export default DeckRepositorie;
