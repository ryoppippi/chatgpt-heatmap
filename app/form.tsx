'use client';

import { useSetAtom } from 'jotai';
import { CloudUploadIcon } from 'lucide-react';
import * as React from 'react';
import {
	Dropzone,
	DropZoneArea,
	DropzoneMessage,
	DropzoneTrigger,
	useDropzone,
} from '@/components/ui/dropzone';
import { conversationsAtom } from '@/lib/atom';
import { validateConversations } from '@/lib/validation';

/** read file as text */
async function readFileAsText(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = () => reject(reader.error);
		reader.readAsText(file);
	});
}

export function Form() {
	const setConversationData = useSetAtom(conversationsAtom);
	const dropzone = useDropzone({
		onDropFile: async (file: File) => {
			const text = await readFileAsText(file);
			const data = JSON.parse(text) as unknown;
			const validationRes = validateConversations(data);
			if (!validationRes.success) {
				console.error(validationRes.errors);
				// eslint-disable-next-line no-alert
				alert('Invalid JSON file');
				return {
					status: 'error',
					error: validationRes.errors?.toString() ?? 'Validation failed',
				};
			}
			return {
				status: 'success',
				result: validationRes.data,
			};
		},
		validation: {
			accept: {
				'application/json': ['.json'],
			},
			maxFiles: 1,
		},
		shiftOnMaxFiles: true,
	});

	/* receive json file and add to conversationDataAtom */
	React.useEffect(() => {
		const [file] = dropzone.fileStatuses;
		if (file == null) {
			return;
		}

		if (file.status === 'success') {
			setConversationData(file.result);
		}
	}, [dropzone.fileStatuses, setConversationData]);

	return (
		<Dropzone {...dropzone}>
			<div className="flex justify-between">
				<DropzoneMessage />
			</div>
			<DropZoneArea>
				<DropzoneTrigger className="flex gap-8 bg-transparent text-sm">
					<CloudUploadIcon className="size-8" />
					<div className="flex flex-col gap-1">
						<p>
							Upload your
							<span className="font-bold">conversations.json</span>
						</p>
					</div>
				</DropzoneTrigger>
			</DropZoneArea>
		</Dropzone>
	);
}
