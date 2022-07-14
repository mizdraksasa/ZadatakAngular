export class EmployeeModel {
    constructor(
        public Id: string,
        public DeletedOn: Date | string,
        public EmployeeName: string,
        public EndTimeUtc: Date | string,
        public StarTimeUtc: Date | string,
        public EntryNotes: string,
        public WorkTimeInHours: number // calculated value
    ) { }
}