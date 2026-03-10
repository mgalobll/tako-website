from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = 'Tako Therapy Backend'
    environment: str = 'development'
    log_level: str = 'INFO'
    allowed_origins: str = 'http://localhost:3000'
    calcom_webhook_secret: str = 'changeme'
    contact_storage_file: str = './data/contact_submissions.jsonl'

    model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8', extra='ignore')

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.allowed_origins.split(',') if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
