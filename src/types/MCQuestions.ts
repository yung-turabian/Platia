export type UserAnswers = UserAnswer[];

export type UserAnswer = number | null;

export interface QuizQuestinons {
	data: QuizQuestinonsData[];
	meta: Meta;
}

interface Meta {
	pagination: Pagination;
}

interface Pagination {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}

export interface QuizQuestinonsData {
	id: number;
	attributes: QuizQuestinonsAtributes;
}

interface QuizQuestinonsAtributes {
	question: string;
	options: string[];
	createdAt: string;
}
