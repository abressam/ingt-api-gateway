export interface KafkaServiceInterface {
    listenToMessages(): Promise<void>;
}