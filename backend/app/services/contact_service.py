import json
from pathlib import Path
from datetime import datetime, timezone

from app.schemas.contact import ContactSubmissionCreate


class ContactService:
    def __init__(self, storage_file: str) -> None:
        self.storage_path = Path(storage_file)
        self.storage_path.parent.mkdir(parents=True, exist_ok=True)

    def save_submission(self, submission: ContactSubmissionCreate) -> None:
        line = {
            **submission.model_dump(),
            'received_at': datetime.now(timezone.utc).isoformat(),
        }
        with self.storage_path.open('a', encoding='utf-8') as file:
            file.write(json.dumps(line, ensure_ascii=True) + '\n')
