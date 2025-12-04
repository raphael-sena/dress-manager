
export type HistoricoAluguelRequest = {
    nomeCliente: string[];
    nomeItem: string;
    modelo: string[];
    dataInicio: string;
    dataFim: string;
    valorInicial: number;
    valorFinal: number;
    page: number;
    size: number;
  };
  
  export type HistoricoAluguelItem = {
    nomeCliente: string;
    emailCliente: string;
    nomeItem: string;
    dataInicio: string;
    dataFim: string;
    valorAluguel: number;
    cor: string;
  };
  
  export type HistoricoAluguelResponse = {
    content: HistoricoAluguelItem[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: {
      pageNumber: number;
      pageSize: number;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      offset: number;
      paged: boolean;
      unpaged: boolean;
    };
    size: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    totalElements: number;
    totalPages: number;
  };
  