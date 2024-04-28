import { Utility, UtilityData } from "@vdomapay/types";

export class UtilitiesService {
  #utilitiesUrl: string;

  constructor(baseUrl: string) {
    this.#utilitiesUrl = `${baseUrl}/utilities`;
  }

  async getAll(): Promise<Utility[]> {
    const response = await fetch(this.#utilitiesUrl);

    return response.json();
  }

  async create(utility: UtilityData): Promise<Utility> {
    const response = await fetch(this.#utilitiesUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(utility),
    });

    return await response.json();
  }

  async delete(id: string): Promise<void> {
    const url = `${this.#utilitiesUrl}/${id}`;
    await fetch(url, {
      method: "DELETE",
    });
  }
}

export const utilitiesService = new UtilitiesService("http://localhost:3000");
