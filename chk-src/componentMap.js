import { lazy } from 'react';
import {
  BarcodeToken,
  BillingEntry,
  OPDRegistration,
  OPDRenewal,
  TokenList,
} from 'pages/opd-ipd-registration/OPD';
import SampleTabLayout from 'sample/SampleTabLayout';
// ================================================ LAZY ==============================================================================
const LinenProcess = lazy(() => import('pages/inventory/laundry/linenProcess'));
const LinenItemCategory = lazy(() => import('pages/inventory/laundry/linenItemCategory'));
const LinenLaundryItem = lazy(() => import('pages/inventory/laundry/linenLaundryItem'));
const LinenSupply = lazy(() => import('pages/inventory/laundry/linenSupply'));
const Location = lazy(() => import('pages/inventory/laundry/location'));
const LocationDepartmentMapping = lazy(() =>
  import('pages/inventory/laundry/locationDepartmentMapping')
);
const LaundryDashboard = lazy(() => import('pages/inventory/laundry/dashboard'));

const Equipment = lazy(() => import('pages/inventory/laundry/equipment'));
const LinenWashingAndDryCleaning = lazy(() =>
  import('pages/inventory/laundry/linenWashingAndDryCleaning')
);
const LaundryItemUtilization = lazy(() => import('pages/inventory/laundry/laundryItemUtilization'));

const NursingDashboard = lazy(() => import('pages/nursing'));
const NewConsultationMaster = lazy(() => import('pages/Consultation/NewConsultation'));

//master
const WoundArea = lazy(() => import('pages/master/woundcare/woundarea'));
const FeeType = lazy(() => import('pages/master/feeType'));
const PaymentDetails = lazy(() => import('pages/master/paymentMode'));
const AssignDuty = lazy(() => import('pages/DutyRoster/AssignDuty/AssignDuty'));
const BuildingType = lazy(() => import('pages/DutyRoster/Building/Building'));
const ShiftMaster = lazy(() => import('pages/DutyRoster/ShiftMaster/ShiftMaster'));
const OPType = lazy(() => import('pages/master/admin/optype'));
const EducationQualification = lazy(() => import('pages/master/staffProfile/education'));
const Specialization = lazy(() => import('pages/master/staffProfile/specialization'));
const StaffCreation = lazy(() => import('pages/master/staffProfile/staff-creation'));
const UserCreation = lazy(() => import('pages/master/staffProfile/userCreation'));

//Master Transport
const AddBattery = lazy(() => import('pages/Transport/batteryType'));
const VehicleClass = lazy(() => import('pages/Transport/vehicle-class'));
const AddFuel = lazy(() => import('pages/Transport/fuelType'));
const InsuranceFile = lazy(() => import('pages/Transport/insurance-file'));
const PolutionFile = lazy(() => import('pages/Transport/pollution-file'));
const RTOFile = lazy(() => import('pages/Transport/rto-file'));
const VehicleAvailability = lazy(() => import('pages/Transport/vehicle-availability'));
const RequestFile = lazy(() => import('pages/Transport/vehicle-request'));
const AttachFixedVehicle = lazy(() => import('pages/Transport/attach-fixed'));
const VehicleLog = lazy(() => import('pages/Transport/vehicle-log'));
const TyresFile = lazy(() => import('pages/Transport/tyres'));
const WorkOrder = lazy(() => import('pages/Transport/work-order'));
const DamageFiles = lazy(() => import('pages/Transport/damage'));
const VehicleAccessories = lazy(() => import('pages/Transport/vehicle-accessories'));
const BatteryDetails = lazy(() => import('pages/Transport/battery'));
const ChangesFile = lazy(() => import('pages/Transport/major-change'));
const OilVehicle = lazy(() => import('pages/Transport/oil'));
const VehicleRegistration = lazy(() => import('pages/Transport/vehicle-registeration'));
const VehicleTransport = lazy(() => import('pages/Transport/vehicle-transport'));
const AppointmentForm = lazy(() => import('pages/opd-ipd-registration/Forms/AppointmentForm'));

const ConsultationType = lazy(() => import('pages/DutyRoster/Consultation/ConsultationRoom'));
const FloorType = lazy(() => import('pages/DutyRoster/Floor/Floor'));
const IpType = lazy(() => import('pages/master/admin/Iptype'));
const SingleTestNormalValue = lazy(() => import('pages/master/lab/singleTest'));
const TestMethod = lazy(() => import('pages/master/lab/testMethod'));
const TestName = lazy(() => import('pages/master/lab/testName'));
const ProcedureDetails = lazy(() => import('pages/master/procedure'));
const VitalSign = lazy(() => import('pages/master/vital'));
const GroupTestNormalValue = lazy(() => import('pages/master/lab/groupTest'));
const SampleType = lazy(() => import('pages/master/lab/sampleType'));

//Blood Bank
const BloodBankDashboard = lazy(() =>
  import('pages/BloodBank/BloodBankDashboard/BloodBankDashboard')
);
const BloodInventory = lazy(() => import('pages/BloodBank/BloodInventory/BloodInventory'));
const RaiseBloodRequest = lazy(() => import('pages/BloodBank/BloodRequests/RaiseBloodRequest'));
const OurHospitalRequests = lazy(() => import('pages/BloodBank/BloodRequests/OurHospitalRequests'));
const OtherHospitalRequests = lazy(() =>
  import('pages/BloodBank/BloodRequests/OtherHospitalRequests')
);
const CampDonors = lazy(() => import('pages/BloodBank/DonorManagement/CampDonors/CampDonors'));
const IndividualDonors = lazy(() =>
  import('./pages/BloodBank/DonorManagement/IndividualDonors/IndividualDonors')
);
const Transfusions = lazy(() => import('pages/BloodBank/Transfusions/Transfusions'));
const LabName = lazy(() => import('pages/master/lab/labs'));
const BloodGrouping = lazy(() => import('pages/BloodBank/BloodGrouping/BloodGrouping'));
const BloodScreening = lazy(() => import('pages/BloodBank/BloodScreening/BloodScreening'));

//lab
const RadiologyViewAssociBodyPart = lazy(() =>
  import('pages/master/lab/radiologyViewAssociBodyPart')
);
const RadiologyBodyPart = lazy(() => import('./pages/master/lab/radiologyBodyPart'));

//OT
const AssignDutyNew = lazy(() => import('pages/assign-duty/index'));
const ConsultationDashboard = lazy(() => import('pages/Consultation/Dashboard'));
const LaboratoryLayout = lazy(() => import('pages/laboratory/Dashboard'));
const SpecimenContainer = lazy(() => import('pages/master/lab/lab-specimen-container'));
const TestUnit = lazy(() => import('pages/master/lab/testUnit'));
const BillingService = lazy(() => import('pages/OperationTheatre/BillingService/BillingService'));
const OTBilling = lazy(() => import('pages/OperationTheatre/OTBilling/OTBilling'));
const OTDashboard = lazy(() => import('pages/OperationTheatre/OTDashboard/OTDashboard'));
const OTNotes = lazy(() => import('pages/OperationTheatre/OTNotes/OTNotes'));
const OTSchedule = lazy(() => import('pages/OperationTheatre/OTSchedule/OTSchedule'));

//diet and kitchen
const BedManagement = lazy(() => import('pages/ipd/bed-management'));
const PatientListIPD = lazy(() => import('pages/ipd/PatientListIPD'));
const LabtestVerification = lazy(() => import('pages/laboratory/labtestVerification'));
const DietArticle = lazy(() => import('pages/master/diet/dietArticle'));
const DietCycle = lazy(() => import('pages/master/diet/dietCycle'));
const FoodItem = lazy(() => import('pages/master/diet/foodItem'));
const MealType = lazy(() => import('pages/master/diet/mealType'));
const OrderSet = lazy(() => import('pages/master/diet/orderSet'));
const Categories = lazy(() => import('pages/master/Sanitation/Categories/categories'));
const Manpower = lazy(() => import('pages/master/Sanitation/ManPower/manpower'));

//Ipd master
const BedType = lazy(() => import('pages/master/bed/bedtype'));
const WardMap = lazy(() => import('pages/master/ward/wardmap'));
const WardType = lazy(() => import('pages/master/ward/wardtype'));
const BedMap = lazy(() => import('pages/master/bed/bedmapping'));
const IPDischargeNote = lazy(() => import('pages/master/ipdischargenote'));
const DraiangeIntensity = lazy(() => import('pages/master/woundcare/drainageintensity'));
const DrainageType = lazy(() => import('pages/master/woundcare/drainagetype'));
const PeriwoundSkinType = lazy(() => import('pages/master/woundcare/periwoundskintype'));
const WoundBed = lazy(() => import('pages/master/woundcare/woundbed'));
const WoundOdour = lazy(() => import('pages/master/woundcare/woundodour'));
const WoundStatus = lazy(() => import('pages/master/woundcare/woundstatus'));
const WoundType = lazy(() => import('pages/master/woundcare/woundtype'));
const TherapyDetails = lazy(() => import('pages/master/therapy/therapydetails'));
const ExternalTherapy = lazy(() => import('pages/master/externalTherapy'));
const PackageDetails = lazy(() => import('pages/master/therapy/packagedetails'));

const LabResultEntry = lazy(() => import('pages/laboratory/labResultEntry'));
const GarbageCollection = lazy(() =>
  import('pages/master/Sanitation/Garbage Collection/GarbageCollection')
);
const PatientMealOrder = lazy(() => import('pages/diet-kitchen/patient-meal-order'));
const BulkMealOrder = lazy(() => import('pages/diet-kitchen/bulk-meal-order'));
const KitchenDashboard = lazy(() => import('pages/diet-kitchen/kitchen-dashboard'));

const Complaints = lazy(() => import('pages/master/Sanitation/Complaints/complaints'));

export default {
  Profile: AppointmentForm,
  Token: TokenList,
  Consultation: NewConsultationMaster,
  'Patient Registration': OPDRegistration,
  Registration: OPDRenewal,
  'Billing Entry': BillingEntry,
  'Barcode & Token': BarcodeToken,
  'Shift Master': ShiftMaster,
  Building: BuildingType,
  'Assign Duty': AssignDuty,
  'Vehicle Transport': VehicleTransport,
  'Vehicle Registration': VehicleRegistration,
  'OP-type': OPType,
  'IP-type': IpType,
  'Educational Qualification': EducationQualification,
  Specialization: Specialization,
  'Staff Creation': StaffCreation,
  'Vital Signs': VitalSign,
  'Users Credentials': UserCreation,
  // 'Product-Type': ProductType,
  'IPD Demo one': SampleTabLayout,
  Floor: FloorType,
  'Consultation Room': ConsultationType,
  Procedure: ProcedureDetails,
  'Test Name': TestName,
  'Test Method': TestMethod,
  'Single Test': SingleTestNormalValue,
  // 'Group Test Name': GroupTestName,
  'Group Test': GroupTestNormalValue,
  'Sample Type': SampleType,
  // 'Sample Association With Test': SampleAssociTest,
  'Radiology Body Part': RadiologyBodyPart,
  'Radiology View - Body Part': RadiologyViewAssociBodyPart,
  'Payment Mode': PaymentDetails,
  'Fee Type': FeeType,
  'Fuel Type': AddFuel,
  'Battery Type': AddBattery,
  'Vehicle Class': VehicleClass,
  'RTO File': RTOFile,
  'Insurance File': InsuranceFile,
  'Polution File': PolutionFile,
  'Vehicle Availability': VehicleAvailability,
  'Vehicle Request': RequestFile,
  'Attach Fixed Vehicle': AttachFixedVehicle,
  'Vehicle Log Book': VehicleLog,
  Damage: DamageFiles,
  Battery: BatteryDetails,
  Tyres: TyresFile,
  'Work Order': WorkOrder,
  Oil: OilVehicle,
  'Major Change': ChangesFile,
  'Vehicle Accessories': VehicleAccessories,
  Labs: LabName,
  'Test Unit': TestUnit,
  'Specimen Container': SpecimenContainer,

  // Blood Bank components
  'Blood Bank Dashboard': BloodBankDashboard,
  'Blood Inventory': BloodInventory,
  'Individual Donors': IndividualDonors,
  'Camp Donors': CampDonors,
  'Raise Blood Request': RaiseBloodRequest,
  'Our Hospital Requests': OurHospitalRequests,
  'Other Hospital Requests': OtherHospitalRequests,
  'Blood Grouping': BloodGrouping,
  'Blood Screening': BloodScreening,
  Transfusions: Transfusions,

  //Sanitation
  Categories: Categories,
  'Man Power': Manpower,
  'Garbage Collection': GarbageCollection,
  Complaints: Complaints,

  //Diet and Kitchen -- start---
  'Diet Article': DietArticle,
  'Meal Type': MealType,
  'Order Set': OrderSet,
  'Food Item': FoodItem,
  'Diet Cycle': DietCycle,
  'Bulk Meal Order': BulkMealOrder,
  'Patient Meal Order': PatientMealOrder,
  'Kitchen Dashboard': KitchenDashboard,
  //Diet and Kitchen -- end---

  // master ipd
  'Ward Type': WardType,
  'Ward Mapping': WardMap,
  'Bed Type': BedType,
  'Bed Mapping': BedMap,
  'IP Discharge Note': IPDischargeNote,
  'Wound Type': WoundType,
  'Wound Bed': WoundBed,
  'Wound Odour': WoundOdour,
  'Wound Status': WoundStatus,
  'Wound Area': WoundArea,
  'Drainage Type': DrainageType,
  'Drainage Intensity': DraiangeIntensity,
  'Periwound Skin Type': PeriwoundSkinType,
  'Therapy Details': TherapyDetails,
  'External Therapy': ExternalTherapy,
  'Package Details': PackageDetails,
  //Laundry
  'Linen Order': LaundryDashboard,
  'Assign Duty New': AssignDutyNew,
  'Consultation Dashboard': ConsultationDashboard,
  'Linen Process': LinenProcess,
  'Linen Item Category': LinenItemCategory,
  'Linen Laundry Item': LinenLaundryItem,
  'Linen Supply': LinenSupply,
  Location: Location,
  'Location Department Mapping': LocationDepartmentMapping,
  Equipment: Equipment,
  'Linen Washing Dry Cleaning': LinenWashingAndDryCleaning,
  'Laundry Item Utilization': LaundryItemUtilization,
  //OT
  'OT Dashboard': OTDashboard,
  'OT Schedule': OTSchedule,
  'OT Notes': OTNotes,
  'OT Billing': OTBilling,
  'Billing Service': BillingService,
  'Lab Dashboard': LaboratoryLayout,
  'Verify Test': LabtestVerification,
  'Lab Result Entry': LabResultEntry,
  //------------startIPD------------------------
  'Patient List': PatientListIPD,
  'Bed Management': BedManagement,
  // -------------END-IPD--------------------
  //--------------START NURSING CARE---------------
  'Nursing Dashboard': NursingDashboard,
  //--------------END NURSING CARE---------------
};
