import { validateConversations } from './validation';

const mockData = [{
	title: 'Asset intensiveの意味',
	create_time: 1738073861.216273,
	update_time: 1738073890.567239,
	mapping: {
		'5e888141-9993-4431-9c65-c32aea03fab8': {
			id: '5e888141-9993-4431-9c65-c32aea03fab8',
			message: null,
			parent: null,
			children: [
				'c081839e-1454-4979-bf9d-13bdd98ed5f0',
			],
		},
		'c081839e-1454-4979-bf9d-13bdd98ed5f0': {
			id: 'c081839e-1454-4979-bf9d-13bdd98ed5f0',
			message: {
				id: 'c081839e-1454-4979-bf9d-13bdd98ed5f0',
				author: {
					role: 'system',
					name: null,
					metadata: {},
				},
				create_time: null,
				update_time: null,
				content: {
					content_type: 'text',
					parts: [
						'',
					],
				},
				status: 'finished_successfully',
				end_turn: true,
				weight: 0,
				metadata: {
					is_visually_hidden_from_conversation: true,
				},
				recipient: 'all',
				channel: null,
			},
			parent: '5e888141-9993-4431-9c65-c32aea03fab8',
			children: [
				'035af418-6a9d-4e31-8fb9-702ab2a730e7',
			],
		},
		'035af418-6a9d-4e31-8fb9-702ab2a730e7': {
			id: '035af418-6a9d-4e31-8fb9-702ab2a730e7',
			message: {
				id: '035af418-6a9d-4e31-8fb9-702ab2a730e7',
				author: {
					role: 'user',
					name: null,
					metadata: {},
				},
				create_time: 1738073861.219247,
				update_time: null,
				content: {
					content_type: 'text',
					parts: [
						'Asset intensiveって何',
					],
				},
				status: 'finished_successfully',
				end_turn: null,
				weight: 1,
				metadata: {
					request_id: '90919b7edfdc6ab3-MAN',
					message_source: null,
					timestamp_: 'absolute',
					message_type: null,
				},
				recipient: 'all',
				channel: null,
			},
			parent: 'c081839e-1454-4979-bf9d-13bdd98ed5f0',
			children: [
				'81957a02-3efb-4fe7-b7f3-54356bdc660f',
			],
		},
		'81957a02-3efb-4fe7-b7f3-54356bdc660f': {
			id: '81957a02-3efb-4fe7-b7f3-54356bdc660f',
			message: {
				id: '81957a02-3efb-4fe7-b7f3-54356bdc660f',
				author: {
					role: 'assistant',
					name: null,
					metadata: {},
				},
				create_time: 1738073889.527827,
				update_time: null,
				content: {
					content_type: 'text',
					parts: [
						'',
					],
				},
				status: 'finished_successfully',
				end_turn: null,
				weight: 1,
				metadata: {
					message_type: null,
					model_slug: 'gpt-4o',
					default_model_slug: 'auto',
					parent_id: '035af418-6a9d-4e31-8fb9-702ab2a730e7',
					request_id: '90919b7edfdc6ab3-MAN',
					timestamp_: 'absolute',
				},
				recipient: 'all',
				channel: null,
			},
			parent: '035af418-6a9d-4e31-8fb9-702ab2a730e7',
			children: [
				'1fa16527-42db-4e2e-a694-23af23c86aaa',
			],
		},
		'1fa16527-42db-4e2e-a694-23af23c86aaa': {
			id: '1fa16527-42db-4e2e-a694-23af23c86aaa',
			message: {
				id: '1fa16527-42db-4e2e-a694-23af23c86aaa',
				author: {
					role: 'assistant',
					name: null,
					metadata: {},
				},
				create_time: 1738073889.527958,
				update_time: null,
				content: {
					content_type: 'text',
					parts: [
						'「Asset intensive」は、日本語で「資産集約型」や「資産依存型」と訳されることが多いビジネスや業界を指します。この用語は、主に以下のような文脈で使われます：\n\n### 1. **資産への依存が高いビジネス**\n   - 製造業、エネルギー、輸送、建設、不動産など、事業運営に大規模な物理的資産（工場、設備、機械、インフラなど）を必要とする業界を指します。\n   - これらの業界では、初期投資が大きく、資産の維持や運用に多額のコストがかかります。\n\n### 2. **資産集約型の特徴**\n   - **高い初期コスト**: 設備やインフラへの巨額の投資が必要。\n   - **固定費が多い**: 資産の維持や運用に定期的なコストがかかる。\n   - **低い流動性**: 資産が流動的でなく、売却や再配置が難しい場合が多い。\n   - **規模の経済**: 規模を拡大することで、資産あたりのコストを抑えるメリットが生まれる。\n\n### 3. **使われる文脈**\n   - 企業戦略: 「当社は資産集約型のビジネスモデルを採用しています」という説明で、自社の事業が物理的資産に依存していることを示す。\n   - 投資: 投資家が企業を評価する際に、資産集約型企業はキャッシュフローやROI（投資収益率）に注目されやすい。\n\nたとえば、発電所を運営する会社や鉄道事業は典型的な「asset intensive」業界に分類されます。一方で、ソフトウェアやサービス業のような「asset light（資産軽量型）」モデルとは対照的です。',
					],
				},
				status: 'finished_successfully',
				end_turn: true,
				weight: 1,
				metadata: {
					finish_details: {
						type: 'stop',
						stop_tokens: [
							200002,
							200007,
						],
					},
					is_complete: true,
					citations: [],
					content_references: [],
					message_type: null,
					model_slug: 'gpt-4o',
					default_model_slug: 'auto',
					parent_id: '81957a02-3efb-4fe7-b7f3-54356bdc660f',
					request_id: '90919b7edfdc6ab3-MAN',
					timestamp_: 'absolute',
				},
				recipient: 'all',
				channel: null,
			},
			parent: '81957a02-3efb-4fe7-b7f3-54356bdc660f',
			children: [],
		},
	},
	moderation_results: [],
	current_node: '1fa16527-42db-4e2e-a694-23af23c86aaa',
	plugin_ids: null,
	conversation_id: '6798e705-08fc-8013-8ff7-bb0535a5dd42',
	conversation_template_id: null,
	gizmo_id: null,
	gizmo_type: null,
	is_archived: false,
	is_starred: null,
	safe_urls: [],
	default_model_slug: 'auto',
	conversation_origin: null,
	voice: null,
	async_status: null,
	disabled_tool_ids: [],
	id: '6798e705-08fc-8013-8ff7-bb0535a5dd42',
}] as const;

describe('validateConversations', () => {
	it('should return success if data is valid', () => {
		const res = validateConversations(mockData);
		expect(res.success).toBe(true);
		if (res.success) {
			expect(res.data).toHaveLength(1);
			expect(res.data[0]).toMatchObject({
				id: '6798e705-08fc-8013-8ff7-bb0535a5dd42',
				title: 'Asset intensiveの意味',
				create_time: 1738073861.216273,
				update_time: 1738073890.567239,
				current_node: '1fa16527-42db-4e2e-a694-23af23c86aaa',
				conversation_id: '6798e705-08fc-8013-8ff7-bb0535a5dd42',
				is_archived: false,
			});
			expect(res.data[0].mapping).toBeDefined();
		}
	});

	it('should return error if data is invalid', () => {
		const res = validateConversations({ invalid: 'data' });
		expect(res.success).toBe(false);
		if (!res.success) {
			expect(res.errors).toBeDefined();
		}
	});
});
