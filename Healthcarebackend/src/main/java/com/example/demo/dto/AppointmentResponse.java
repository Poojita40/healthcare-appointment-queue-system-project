package com.example.demo.dto;

public class AppointmentResponse {

    private Long patientId;
    private String patientName;

    private Long doctorId;
    private String doctorName;

    private String problem;
    private String appointmentDate;
    private String appointmentTime;

    private int queueNumber;
    private String status;

    public AppointmentResponse(Long patientId, String patientName,
                               Long doctorId, String doctorName,
                               String problem,
                               String appointmentDate,
                               String appointmentTime,
                               int queueNumber,
                               String status) {

        this.patientId = patientId;
        this.patientName = patientName;
        this.doctorId = doctorId;
        this.doctorName = doctorName;
        this.problem = problem;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
        this.queueNumber = queueNumber;
        this.status = status;
    }

    public Long getPatientId() { return patientId; }
    public String getPatientName() { return patientName; }

    public Long getDoctorId() { return doctorId; }
    public String getDoctorName() { return doctorName; }

    public String getProblem() { return problem; }
    public String getAppointmentDate() { return appointmentDate; }
    public String getAppointmentTime() { return appointmentTime; }

    public int getQueueNumber() { return queueNumber; }
    public String getStatus() { return status; }
}