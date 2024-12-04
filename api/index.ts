import { BCBCoinDetails, BCBCoinOverview } from '../types';

interface GetCoinProps {
    date: Date;
    coin: string;
}

async function getCoinFromBC(props: GetCoinProps | null = null) {
    if (!props) {
        const res = await fetch(
            'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?$top=100&$format=json',
        );
        const json: BCBCoinOverview[] = (await res.json()).value;
        return json;
    }

    const { date, coin } = props;

    const formattedDate = date
        .toLocaleDateString('pt-BR')
        .split('/')
        .reverse()
        .join('-');

    const res = await fetch(
        `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='${coin}'&@dataCotacao='${formattedDate}'&$top=1&$format=json,`,
    );

    const json = (await res.json()).value;

    json.dataHoraCotacao = new Date(json.dataHoraCotacao);

    return json as BCBCoinDetails;
}

export { getCoinFromBC };
