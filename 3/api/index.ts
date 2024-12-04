import { APIIssue } from '../types/api.issue';
import { APIRepo } from '../types/api.repo';
import { APIUser } from '../types/api.user';
import { sendToAutenticationScreenAndClearToken } from '../utils';

const baseURL = 'https://api.github.com';

function makeBearerToken(token: string): string {
    return `Bearer ${token.trim()}`;
}

async function getUserWithToken(token: string): Promise<APIUser> {
    const res = await fetch(baseURL + '/user', {
        headers: {
            Authorization: makeBearerToken(token),
        },
    });

    if (res.status === 401) {
        sendToAutenticationScreenAndClearToken();
    }

    if (!res.ok) {
        throw new Error('Token inválido ou expirado.');
    }

    return (await res.json()) as APIUser;
}

async function getTotalReposQuantity(token: string) {
    let total = 0;
    for (let i = 1; ; i++) {
        const res = await fetch(`${baseURL}/user/repos?page=${i}`, {
            headers: {
                Authorization: makeBearerToken(token),
            },
        });
        const json = (await res.json()) as APIRepo[];
        if (json.length === 0) break;
        total += json.length;
    }
    return total;
}

async function getUserRepos(
    token: string,
    page: number = 1,
): Promise<APIRepo[]> {
    const res = await fetch(`${baseURL}/user/repos?page=${page}`, {
        headers: {
            Authorization: makeBearerToken(token),
        },
    });

    if (res.status === 401) {
        sendToAutenticationScreenAndClearToken();
    }

    if (!res.ok) {
        throw new Error('Erro ao pegar repositórios.');
    }

    return (await res.json()) as APIRepo[];
}

async function getUserIssues(token: string): Promise<APIIssue[]> {
    const res = await fetch(`${baseURL}/issues`, {
        headers: {
            Authorization: makeBearerToken(token),
        },
    });

    if (res.status === 401) {
        sendToAutenticationScreenAndClearToken();
    }

    if (!res.ok) {
        throw new Error('Erro ao pegar issues.');
    }

    return (await res.json()) as APIIssue[];
}

export { getUserWithToken, getUserRepos, getUserIssues, getTotalReposQuantity };
