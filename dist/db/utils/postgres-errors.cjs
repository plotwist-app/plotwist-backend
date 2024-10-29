"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/db/utils/postgres-errors.ts
var postgres_errors_exports = {};
__export(postgres_errors_exports, {
  PgCardinalityViolation: () => PgCardinalityViolation,
  PgCaseNotFound: () => PgCaseNotFound,
  PgConfigurationFileError: () => PgConfigurationFileError,
  PgConnectionException: () => PgConnectionException,
  PgDataException: () => PgDataException,
  PgDependentPrivilegeDescriptorsStillExist: () => PgDependentPrivilegeDescriptorsStillExist,
  PgDiagnosticsException: () => PgDiagnosticsException,
  PgExternalRoutineException: () => PgExternalRoutineException,
  PgExternalRoutineInvocationException: () => PgExternalRoutineInvocationException,
  PgFeatureNotSupported: () => PgFeatureNotSupported,
  PgForeignDataWrapperError: () => PgForeignDataWrapperError,
  PgInsufficientResources: () => PgInsufficientResources,
  PgIntegrityConstraintViolation: () => PgIntegrityConstraintViolation,
  PgInternalError: () => PgInternalError,
  PgInvalidAuthorizationSpecification: () => PgInvalidAuthorizationSpecification,
  PgInvalidCatalogName: () => PgInvalidCatalogName,
  PgInvalidCursorName: () => PgInvalidCursorName,
  PgInvalidCursorState: () => PgInvalidCursorState,
  PgInvalidGrantor: () => PgInvalidGrantor,
  PgInvalidRoleSpecification: () => PgInvalidRoleSpecification,
  PgInvalidSchemaName: () => PgInvalidSchemaName,
  PgInvalidSqlStatementName: () => PgInvalidSqlStatementName,
  PgInvalidTransactionInitiation: () => PgInvalidTransactionInitiation,
  PgInvalidTransactionState: () => PgInvalidTransactionState,
  PgInvalidTransactionTermination: () => PgInvalidTransactionTermination,
  PgLocatorException: () => PgLocatorException,
  PgNoData: () => PgNoData,
  PgObjectNotInPrerequisiteState: () => PgObjectNotInPrerequisiteState,
  PgOperatorIntervention: () => PgOperatorIntervention,
  PgPlPgsqlError: () => PgPlPgsqlError,
  PgProgramLimitExceeded: () => PgProgramLimitExceeded,
  PgSavepointException: () => PgSavepointException,
  PgSnapshotFailure: () => PgSnapshotFailure,
  PgSqlRoutineException: () => PgSqlRoutineException,
  PgSqlStatementNotYetComplete: () => PgSqlStatementNotYetComplete,
  PgSuccessfulCompletion: () => PgSuccessfulCompletion,
  PgSyntaxErrorOrAccessRuleViolation: () => PgSyntaxErrorOrAccessRuleViolation,
  PgSystemError: () => PgSystemError,
  PgTransactionRollback: () => PgTransactionRollback,
  PgTriggeredActionException: () => PgTriggeredActionException,
  PgTriggeredDataChangeViolation: () => PgTriggeredDataChangeViolation,
  PgWarning: () => PgWarning,
  PgWithCheckOptionViolation: () => PgWithCheckOptionViolation
});
module.exports = __toCommonJS(postgres_errors_exports);
var PgSuccessfulCompletion = /* @__PURE__ */ ((PgSuccessfulCompletion2) => {
  PgSuccessfulCompletion2["SuccessfulCompletion"] = "00000";
  return PgSuccessfulCompletion2;
})(PgSuccessfulCompletion || {});
var PgWarning = /* @__PURE__ */ ((PgWarning2) => {
  PgWarning2["Warning"] = "01000";
  PgWarning2["DynamicResultSetsReturned"] = "0100C";
  PgWarning2["ImplicitZeroBitPadding"] = "01008";
  PgWarning2["NullValueEliminatedInSetFunction"] = "01003";
  PgWarning2["PrivilegeNotGranted"] = "01007";
  PgWarning2["PrivilegeNotRevoked"] = "01006";
  PgWarning2["StringDataRightTruncation"] = "01004";
  PgWarning2["DeprecatedFeature"] = "01P01";
  return PgWarning2;
})(PgWarning || {});
var PgNoData = /* @__PURE__ */ ((PgNoData2) => {
  PgNoData2["NoData"] = "02000";
  PgNoData2["NoAdditionalDynamicResultSetsReturned"] = "02001";
  return PgNoData2;
})(PgNoData || {});
var PgSqlStatementNotYetComplete = /* @__PURE__ */ ((PgSqlStatementNotYetComplete2) => {
  PgSqlStatementNotYetComplete2["SqlStatementNotYetComplete"] = "03000";
  return PgSqlStatementNotYetComplete2;
})(PgSqlStatementNotYetComplete || {});
var PgConnectionException = /* @__PURE__ */ ((PgConnectionException2) => {
  PgConnectionException2["ConnectionException"] = "08000";
  PgConnectionException2["ConnectionDoesNotExist"] = "08003";
  PgConnectionException2["ConnectionFailure"] = "08006";
  PgConnectionException2["SqlclientUnableToEstablishSqlconnection"] = "08001";
  PgConnectionException2["SqlserverRejectedEstablishmentOfSqlconnection"] = "08004";
  PgConnectionException2["TransactionResolutionUnknown"] = "08007";
  PgConnectionException2["ProtocolViolation"] = "08P01";
  return PgConnectionException2;
})(PgConnectionException || {});
var PgTriggeredActionException = /* @__PURE__ */ ((PgTriggeredActionException2) => {
  PgTriggeredActionException2["TriggeredActionException"] = "09000";
  return PgTriggeredActionException2;
})(PgTriggeredActionException || {});
var PgFeatureNotSupported = /* @__PURE__ */ ((PgFeatureNotSupported2) => {
  PgFeatureNotSupported2["FeatureNotSupported"] = "0A000";
  return PgFeatureNotSupported2;
})(PgFeatureNotSupported || {});
var PgInvalidTransactionInitiation = /* @__PURE__ */ ((PgInvalidTransactionInitiation2) => {
  PgInvalidTransactionInitiation2["InvalidTransactionInitiation"] = "0B000";
  return PgInvalidTransactionInitiation2;
})(PgInvalidTransactionInitiation || {});
var PgLocatorException = /* @__PURE__ */ ((PgLocatorException2) => {
  PgLocatorException2["LocatorException"] = "0F000";
  PgLocatorException2["InvalidLocatorSpecification"] = "0F001";
  return PgLocatorException2;
})(PgLocatorException || {});
var PgInvalidGrantor = /* @__PURE__ */ ((PgInvalidGrantor2) => {
  PgInvalidGrantor2["InvalidGrantor"] = "0L000";
  PgInvalidGrantor2["InvalidGrantOperation"] = "0LP01";
  return PgInvalidGrantor2;
})(PgInvalidGrantor || {});
var PgInvalidRoleSpecification = /* @__PURE__ */ ((PgInvalidRoleSpecification2) => {
  PgInvalidRoleSpecification2["InvalidRoleSpecification"] = "0P000";
  return PgInvalidRoleSpecification2;
})(PgInvalidRoleSpecification || {});
var PgDiagnosticsException = /* @__PURE__ */ ((PgDiagnosticsException2) => {
  PgDiagnosticsException2["DiagnosticsException"] = "0Z000";
  PgDiagnosticsException2["StackedDiagnosticsAccessedWithoutActiveHandler"] = "0Z002";
  return PgDiagnosticsException2;
})(PgDiagnosticsException || {});
var PgCaseNotFound = /* @__PURE__ */ ((PgCaseNotFound2) => {
  PgCaseNotFound2["CaseNotFound"] = "20000";
  return PgCaseNotFound2;
})(PgCaseNotFound || {});
var PgCardinalityViolation = /* @__PURE__ */ ((PgCardinalityViolation2) => {
  PgCardinalityViolation2["CardinalityViolation"] = "21000";
  return PgCardinalityViolation2;
})(PgCardinalityViolation || {});
var PgDataException = /* @__PURE__ */ ((PgDataException2) => {
  PgDataException2["DataException"] = "22000";
  PgDataException2["ArraySubscriptError"] = "2202E";
  PgDataException2["CharacterNotInRepertoire"] = "22021";
  PgDataException2["DatetimeFieldOverflow"] = "22008";
  PgDataException2["DivisionByZero"] = "22012";
  PgDataException2["ErrorInAssignment"] = "22005";
  PgDataException2["EscapeCharacterConflict"] = "2200B";
  PgDataException2["IndicatorOverflow"] = "22022";
  PgDataException2["IntervalFieldOverflow"] = "22015";
  PgDataException2["InvalidArgumentForLogarithm"] = "2201E";
  PgDataException2["InvalidArgumentForNtileFunction"] = "22014";
  PgDataException2["InvalidArgumentForNthValueFunction"] = "22016";
  PgDataException2["InvalidArgumentForPowerFunction"] = "2201F";
  PgDataException2["InvalidArgumentForWidthBucketFunction"] = "2201G";
  PgDataException2["InvalidCharacterValueForCast"] = "22018";
  PgDataException2["InvalidDatetimeFormat"] = "22007";
  PgDataException2["InvalidEscapeCharacter"] = "22019";
  PgDataException2["InvalidEscapeOctet"] = "2200D";
  PgDataException2["InvalidEscapeSequence"] = "22025";
  PgDataException2["NonstandardUseOfEscapeCharacter"] = "22P06";
  PgDataException2["InvalidIndicatorParameterValue"] = "22010";
  PgDataException2["InvalidParameterValue"] = "22023";
  PgDataException2["InvalidPrecedingOrFollowingSize"] = "22013";
  PgDataException2["InvalidRegularExpression"] = "2201B";
  PgDataException2["InvalidRowCountInLimitClause"] = "2201W";
  PgDataException2["InvalidRowCountInResultOffsetClause"] = "2201X";
  PgDataException2["InvalidTablesampleArgument"] = "2202H";
  PgDataException2["InvalidTablesampleRepeat"] = "2202G";
  PgDataException2["InvalidTimeZoneDisplacementValue"] = "22009";
  PgDataException2["InvalidUseOfEscapeCharacter"] = "2200C";
  PgDataException2["MostSpecificTypeMismatch"] = "2200G";
  PgDataException2["NullValueNotAllowed"] = "22004";
  PgDataException2["NullValueNoIndicatorParameter"] = "22002";
  PgDataException2["NumericValueOutOfRange"] = "22003";
  PgDataException2["SequenceGeneratorLimitExceeded"] = "2200H";
  PgDataException2["StringDataLengthMismatch"] = "22026";
  PgDataException2["StringDataRightTruncation"] = "22001";
  PgDataException2["SubstringError"] = "22011";
  PgDataException2["TrimError"] = "22027";
  PgDataException2["UnterminatedCString"] = "22024";
  PgDataException2["ZeroLengthCharacterString"] = "2200F";
  PgDataException2["FloatingPointException"] = "22P01";
  PgDataException2["InvaliduuidRepresentation"] = "22P02";
  PgDataException2["InvalidBinaryRepresentation"] = "22P03";
  PgDataException2["BadCopyFileFormat"] = "22P04";
  PgDataException2["UntranslatableCharacter"] = "22P05";
  PgDataException2["NotAnXmlDocument"] = "2200L";
  PgDataException2["InvalidXmlDocument"] = "2200M";
  PgDataException2["InvalidXmlContent"] = "2200N";
  PgDataException2["InvalidXmlComment"] = "2200S";
  PgDataException2["InvalidXmlProcessingInstruction"] = "2200T";
  PgDataException2["DuplicateJsonObjectKeyValue"] = "22030";
  PgDataException2["InvalidJsonuuid"] = "22032";
  PgDataException2["InvalidSqlJsonSubscript"] = "22033";
  PgDataException2["MoreThanOneSqlJsonItem"] = "22034";
  PgDataException2["NoSqlJsonItem"] = "22035";
  PgDataException2["NonNumericSqlJsonItem"] = "22036";
  PgDataException2["NonUniqueKeysInAJsonObject"] = "22037";
  PgDataException2["SingletonSqlJsonItemRequired"] = "22038";
  PgDataException2["SqlJsonArrayNotFound"] = "22039";
  PgDataException2["SqlJsonMemberNotFound"] = "2203A";
  PgDataException2["SqlJsonNumberNotFound"] = "2203B";
  PgDataException2["SqlJsonObjectNotFound"] = "2203C";
  PgDataException2["TooManyJsonArrayElements"] = "2203D";
  PgDataException2["TooManyJsonObjectMembers"] = "2203E";
  PgDataException2["SqlJsonScalarRequired"] = "2203F";
  return PgDataException2;
})(PgDataException || {});
var PgIntegrityConstraintViolation = /* @__PURE__ */ ((PgIntegrityConstraintViolation2) => {
  PgIntegrityConstraintViolation2["IntegrityConstraintViolation"] = "23000";
  PgIntegrityConstraintViolation2["RestrictViolation"] = "23001";
  PgIntegrityConstraintViolation2["NotNullViolation"] = "23502";
  PgIntegrityConstraintViolation2["ForeignKeyViolation"] = "23503";
  PgIntegrityConstraintViolation2["UniqueViolation"] = "23505";
  PgIntegrityConstraintViolation2["CheckViolation"] = "23514";
  PgIntegrityConstraintViolation2["ExclusionViolation"] = "23P01";
  return PgIntegrityConstraintViolation2;
})(PgIntegrityConstraintViolation || {});
var PgInvalidCursorState = /* @__PURE__ */ ((PgInvalidCursorState2) => {
  PgInvalidCursorState2["InvalidCursorState"] = "24000";
  return PgInvalidCursorState2;
})(PgInvalidCursorState || {});
var PgInvalidTransactionState = /* @__PURE__ */ ((PgInvalidTransactionState2) => {
  PgInvalidTransactionState2["InvalidTransactionState"] = "25000";
  PgInvalidTransactionState2["ActiveSqlTransaction"] = "25001";
  PgInvalidTransactionState2["BranchTransactionAlreadyActive"] = "25002";
  PgInvalidTransactionState2["HeldCursorRequiresSameIsolationLevel"] = "25008";
  PgInvalidTransactionState2["InappropriateAccessModeForBranchTransaction"] = "25003";
  PgInvalidTransactionState2["InappropriateIsolationLevelForBranchTransaction"] = "25004";
  PgInvalidTransactionState2["NoActiveSqlTransactionForBranchTransaction"] = "25005";
  PgInvalidTransactionState2["ReadOnlySqlTransaction"] = "25006";
  PgInvalidTransactionState2["SchemaAndDataStatementMixingNotSupported"] = "25007";
  PgInvalidTransactionState2["NoActiveSqlTransaction"] = "25P01";
  PgInvalidTransactionState2["InFailedSqlTransaction"] = "25P02";
  PgInvalidTransactionState2["IdleInTransactionSessionTimeout"] = "25P03";
  return PgInvalidTransactionState2;
})(PgInvalidTransactionState || {});
var PgInvalidSqlStatementName = /* @__PURE__ */ ((PgInvalidSqlStatementName2) => {
  PgInvalidSqlStatementName2["InvalidSqlStatementName"] = "26000";
  return PgInvalidSqlStatementName2;
})(PgInvalidSqlStatementName || {});
var PgTriggeredDataChangeViolation = /* @__PURE__ */ ((PgTriggeredDataChangeViolation2) => {
  PgTriggeredDataChangeViolation2["TriggeredDataChangeViolation"] = "27000";
  return PgTriggeredDataChangeViolation2;
})(PgTriggeredDataChangeViolation || {});
var PgInvalidAuthorizationSpecification = /* @__PURE__ */ ((PgInvalidAuthorizationSpecification2) => {
  PgInvalidAuthorizationSpecification2["InvalidAuthorizationSpecification"] = "28000";
  PgInvalidAuthorizationSpecification2["InvalidPassword"] = "28P01";
  return PgInvalidAuthorizationSpecification2;
})(PgInvalidAuthorizationSpecification || {});
var PgDependentPrivilegeDescriptorsStillExist = /* @__PURE__ */ ((PgDependentPrivilegeDescriptorsStillExist2) => {
  PgDependentPrivilegeDescriptorsStillExist2["DependentPrivilegeDescriptorsStillExist"] = "2B000";
  PgDependentPrivilegeDescriptorsStillExist2["DependentObjectsStillExist"] = "2BP01";
  return PgDependentPrivilegeDescriptorsStillExist2;
})(PgDependentPrivilegeDescriptorsStillExist || {});
var PgInvalidTransactionTermination = /* @__PURE__ */ ((PgInvalidTransactionTermination2) => {
  PgInvalidTransactionTermination2["InvalidTransactionTermination"] = "2D000";
  return PgInvalidTransactionTermination2;
})(PgInvalidTransactionTermination || {});
var PgSqlRoutineException = /* @__PURE__ */ ((PgSqlRoutineException2) => {
  PgSqlRoutineException2["SqlRoutineException"] = "2F000";
  PgSqlRoutineException2["FunctionExecutedNoReturnStatement"] = "2F005";
  PgSqlRoutineException2["ModifyingSqlDataNotPermitted"] = "2F002";
  PgSqlRoutineException2["ProhibitedSqlStatementAttempted"] = "2F003";
  PgSqlRoutineException2["ReadingSqlDataNotPermitted"] = "2F004";
  return PgSqlRoutineException2;
})(PgSqlRoutineException || {});
var PgInvalidCursorName = /* @__PURE__ */ ((PgInvalidCursorName2) => {
  PgInvalidCursorName2["InvalidCursorName"] = "34000";
  return PgInvalidCursorName2;
})(PgInvalidCursorName || {});
var PgExternalRoutineException = /* @__PURE__ */ ((PgExternalRoutineException2) => {
  PgExternalRoutineException2["ExternalRoutineException"] = "38000";
  PgExternalRoutineException2["ContainingSqlNotPermitted"] = "38001";
  PgExternalRoutineException2["ModifyingSqlDataNotPermitted"] = "38002";
  PgExternalRoutineException2["ProhibitedSqlStatementAttempted"] = "38003";
  PgExternalRoutineException2["ReadingSqlDataNotPermitted"] = "38004";
  return PgExternalRoutineException2;
})(PgExternalRoutineException || {});
var PgExternalRoutineInvocationException = /* @__PURE__ */ ((PgExternalRoutineInvocationException2) => {
  PgExternalRoutineInvocationException2["ExternalRoutineInvocationException"] = "39000";
  PgExternalRoutineInvocationException2["InvalidSqlstateReturned"] = "39001";
  PgExternalRoutineInvocationException2["NullValueNotAllowed"] = "39004";
  PgExternalRoutineInvocationException2["TriggerProtocolViolated"] = "39P01";
  PgExternalRoutineInvocationException2["SrfProtocolViolated"] = "39P02";
  PgExternalRoutineInvocationException2["EventTriggerProtocolViolated"] = "39P03";
  return PgExternalRoutineInvocationException2;
})(PgExternalRoutineInvocationException || {});
var PgSavepointException = /* @__PURE__ */ ((PgSavepointException2) => {
  PgSavepointException2["SavepointException"] = "3B000";
  PgSavepointException2["InvalidSavepointSpecification"] = "3B001";
  return PgSavepointException2;
})(PgSavepointException || {});
var PgInvalidCatalogName = /* @__PURE__ */ ((PgInvalidCatalogName2) => {
  PgInvalidCatalogName2["InvalidCatalogName"] = "3D000";
  return PgInvalidCatalogName2;
})(PgInvalidCatalogName || {});
var PgInvalidSchemaName = /* @__PURE__ */ ((PgInvalidSchemaName2) => {
  PgInvalidSchemaName2["InvalidSchemaName"] = "3F000";
  return PgInvalidSchemaName2;
})(PgInvalidSchemaName || {});
var PgTransactionRollback = /* @__PURE__ */ ((PgTransactionRollback2) => {
  PgTransactionRollback2["TransactionRollback"] = "40000";
  PgTransactionRollback2["TransactionIntegrityConstraintViolation"] = "40002";
  PgTransactionRollback2["SerializationFailure"] = "40001";
  PgTransactionRollback2["StatementCompletionUnknown"] = "40003";
  PgTransactionRollback2["DeadlockDetected"] = "40P01";
  return PgTransactionRollback2;
})(PgTransactionRollback || {});
var PgSyntaxErrorOrAccessRuleViolation = /* @__PURE__ */ ((PgSyntaxErrorOrAccessRuleViolation2) => {
  PgSyntaxErrorOrAccessRuleViolation2["SyntaxErrorOrAccessRuleViolation"] = "42000";
  PgSyntaxErrorOrAccessRuleViolation2["SyntaxError"] = "42601";
  PgSyntaxErrorOrAccessRuleViolation2["InsufficientPrivilege"] = "42501";
  PgSyntaxErrorOrAccessRuleViolation2["CannotCoerce"] = "42846";
  PgSyntaxErrorOrAccessRuleViolation2["GroupingError"] = "42803";
  PgSyntaxErrorOrAccessRuleViolation2["WindowingError"] = "42P20";
  PgSyntaxErrorOrAccessRuleViolation2["InvalidRecursion"] = "42P19";
  PgSyntaxErrorOrAccessRuleViolation2["InvalidForeignKey"] = "42830";
  PgSyntaxErrorOrAccessRuleViolation2["InvalidName"] = "42602";
  PgSyntaxErrorOrAccessRuleViolation2["NameTooLong"] = "42622";
  PgSyntaxErrorOrAccessRuleViolation2["ReservedName"] = "42939";
  PgSyntaxErrorOrAccessRuleViolation2["DatatypeMismatch"] = "42804";
  PgSyntaxErrorOrAccessRuleViolation2["IndeterminateDatatype"] = "42P18";
  PgSyntaxErrorOrAccessRuleViolation2["CollationMismatch"] = "42P21";
  PgSyntaxErrorOrAccessRuleViolation2["IndeterminateCollation"] = "42P22";
  PgSyntaxErrorOrAccessRuleViolation2["WrongObjectType"] = "42809";
  PgSyntaxErrorOrAccessRuleViolation2["GeneratedAlways"] = "428C9";
  PgSyntaxErrorOrAccessRuleViolation2["UndefinedColumn"] = "42703";
  PgSyntaxErrorOrAccessRuleViolation2["UndefinedFunction"] = "42883";
  PgSyntaxErrorOrAccessRuleViolation2["UndefinedTable"] = "42P01";
  PgSyntaxErrorOrAccessRuleViolation2["UndefinedParameter"] = "42P02";
  PgSyntaxErrorOrAccessRuleViolation2["UndefinedObject"] = "42704";
  PgSyntaxErrorOrAccessRuleViolation2["DuplicateColumn"] = "42701";
  PgSyntaxErrorOrAccessRuleViolation2["DuplicateCursor"] = "42P03";
  PgSyntaxErrorOrAccessRuleViolation2["DuplicateDatabase"] = "42P04";
  PgSyntaxErrorOrAccessRuleViolation2["DuplicateFunction"] = "42723";
  PgSyntaxErrorOrAccessRuleViolation2["DuplicatePreparedStatement"] = "42P05";
  PgSyntaxErrorOrAccessRuleViolation2["DuplicateSchema"] = "42P06";
  PgSyntaxErrorOrAccessRuleViolation2["DuplicateTable"] = "42P07";
  PgSyntaxErrorOrAccessRuleViolation2["DuplicateAlias"] = "42712";
  PgSyntaxErrorOrAccessRuleViolation2["DuplicateObject"] = "42710";
  PgSyntaxErrorOrAccessRuleViolation2["AmbiguousColumn"] = "42702";
  PgSyntaxErrorOrAccessRuleViolation2["AmbiguousFunction"] = "42725";
  PgSyntaxErrorOrAccessRuleViolation2["AmbiguousParameter"] = "42P08";
  PgSyntaxErrorOrAccessRuleViolation2["AmbiguousAlias"] = "42P09";
  PgSyntaxErrorOrAccessRuleViolation2["InvalidColumnReference"] = "42P10";
  PgSyntaxErrorOrAccessRuleViolation2["InvalidColumnDefinition"] = "42611";
  PgSyntaxErrorOrAccessRuleViolation2["InvalidCursorDefinition"] = "42P11";
  PgSyntaxErrorOrAccessRuleViolation2["InvalidDatabaseDefinition"] = "42P12";
  PgSyntaxErrorOrAccessRuleViolation2["InvalidFunctionDefinition"] = "42P13";
  PgSyntaxErrorOrAccessRuleViolation2["InvalidPreparedStatementDefinition"] = "42P14";
  PgSyntaxErrorOrAccessRuleViolation2["InvalidSchemaDefinition"] = "42P15";
  PgSyntaxErrorOrAccessRuleViolation2["InvalidTableDefinition"] = "42P16";
  PgSyntaxErrorOrAccessRuleViolation2["InvalidObjectDefinition"] = "42P17";
  return PgSyntaxErrorOrAccessRuleViolation2;
})(PgSyntaxErrorOrAccessRuleViolation || {});
var PgWithCheckOptionViolation = /* @__PURE__ */ ((PgWithCheckOptionViolation2) => {
  PgWithCheckOptionViolation2["WithCheckOptionViolation"] = "44000";
  return PgWithCheckOptionViolation2;
})(PgWithCheckOptionViolation || {});
var PgInsufficientResources = /* @__PURE__ */ ((PgInsufficientResources2) => {
  PgInsufficientResources2["InsufficientResources"] = "53000";
  PgInsufficientResources2["DiskFull"] = "53100";
  PgInsufficientResources2["OutOfMemory"] = "53200";
  PgInsufficientResources2["TooManyConnections"] = "53300";
  PgInsufficientResources2["ConfigurationLimitExceeded"] = "53400";
  return PgInsufficientResources2;
})(PgInsufficientResources || {});
var PgProgramLimitExceeded = /* @__PURE__ */ ((PgProgramLimitExceeded2) => {
  PgProgramLimitExceeded2["ProgramLimitExceeded"] = "54000";
  PgProgramLimitExceeded2["StatementTooComplex"] = "54001";
  PgProgramLimitExceeded2["TooManyColumns"] = "54011";
  PgProgramLimitExceeded2["TooManyArguments"] = "54023";
  return PgProgramLimitExceeded2;
})(PgProgramLimitExceeded || {});
var PgObjectNotInPrerequisiteState = /* @__PURE__ */ ((PgObjectNotInPrerequisiteState2) => {
  PgObjectNotInPrerequisiteState2["ObjectNotInPrerequisiteState"] = "55000";
  PgObjectNotInPrerequisiteState2["ObjectInUse"] = "55006";
  PgObjectNotInPrerequisiteState2["CantChangeRuntimeParam"] = "55P02";
  PgObjectNotInPrerequisiteState2["LockNotAvailable"] = "55P03";
  PgObjectNotInPrerequisiteState2["UnsafeNewEnumValueUsage"] = "55P04";
  return PgObjectNotInPrerequisiteState2;
})(PgObjectNotInPrerequisiteState || {});
var PgOperatorIntervention = /* @__PURE__ */ ((PgOperatorIntervention2) => {
  PgOperatorIntervention2["OperatorIntervention"] = "57000";
  PgOperatorIntervention2["QueryCanceled"] = "57014";
  PgOperatorIntervention2["AdminShutdown"] = "57P01";
  PgOperatorIntervention2["CrashShutdown"] = "57P02";
  PgOperatorIntervention2["CannotConnectNow"] = "57P03";
  PgOperatorIntervention2["DatabaseDropped"] = "57P04";
  return PgOperatorIntervention2;
})(PgOperatorIntervention || {});
var PgSystemError = /* @__PURE__ */ ((PgSystemError2) => {
  PgSystemError2["SystemError"] = "58000";
  PgSystemError2["IoError"] = "58030";
  PgSystemError2["UndefinedFile"] = "58P01";
  PgSystemError2["DuplicateFile"] = "58P02";
  return PgSystemError2;
})(PgSystemError || {});
var PgSnapshotFailure = /* @__PURE__ */ ((PgSnapshotFailure2) => {
  PgSnapshotFailure2["SnapshotTooOld"] = "72000";
  return PgSnapshotFailure2;
})(PgSnapshotFailure || {});
var PgConfigurationFileError = /* @__PURE__ */ ((PgConfigurationFileError2) => {
  PgConfigurationFileError2["ConfigFileError"] = "F0000";
  PgConfigurationFileError2["LockFileExists"] = "F0001";
  return PgConfigurationFileError2;
})(PgConfigurationFileError || {});
var PgForeignDataWrapperError = /* @__PURE__ */ ((PgForeignDataWrapperError2) => {
  PgForeignDataWrapperError2["FdwError"] = "HV000";
  PgForeignDataWrapperError2["FdwColumnNameNotFound"] = "HV005";
  PgForeignDataWrapperError2["FdwDynamicParameterValueNeeded"] = "HV002";
  PgForeignDataWrapperError2["FdwFunctionSequenceError"] = "HV010";
  PgForeignDataWrapperError2["FdwInconsistentDescriptorInformation"] = "HV021";
  PgForeignDataWrapperError2["FdwInvalidAttributeValue"] = "HV024";
  PgForeignDataWrapperError2["FdwInvalidColumnName"] = "HV007";
  PgForeignDataWrapperError2["FdwInvalidColumnNumber"] = "HV008";
  PgForeignDataWrapperError2["FdwInvalidDataType"] = "HV004";
  PgForeignDataWrapperError2["FdwInvalidDataTypeDescriptors"] = "HV006";
  PgForeignDataWrapperError2["FdwInvalidDescriptorFieldIdentifier"] = "HV091";
  PgForeignDataWrapperError2["FdwInvalidHandle"] = "HV00B";
  PgForeignDataWrapperError2["FdwInvalidOptionIndex"] = "HV00C";
  PgForeignDataWrapperError2["FdwInvalidOptionName"] = "HV00D";
  PgForeignDataWrapperError2["FdwInvalidStringLengthOrBufferLength"] = "HV090";
  PgForeignDataWrapperError2["FdwInvalidStringFormat"] = "HV00A";
  PgForeignDataWrapperError2["FdwInvalidUseOfNullPointer"] = "HV009";
  PgForeignDataWrapperError2["FdwTooManyHandles"] = "HV014";
  PgForeignDataWrapperError2["FdwOutOfMemory"] = "HV001";
  PgForeignDataWrapperError2["FdwNoSchemas"] = "HV00P";
  PgForeignDataWrapperError2["FdwOptionNameNotFound"] = "HV00J";
  PgForeignDataWrapperError2["FdwReplyHandle"] = "HV00K";
  PgForeignDataWrapperError2["FdwSchemaNotFound"] = "HV00Q";
  PgForeignDataWrapperError2["FdwTableNotFound"] = "HV00R";
  PgForeignDataWrapperError2["FdwUnableToCreateExecution"] = "HV00L";
  PgForeignDataWrapperError2["FdwUnableToCreateReply"] = "HV00M";
  PgForeignDataWrapperError2["FdwUnableToEstablishConnection"] = "HV00N";
  return PgForeignDataWrapperError2;
})(PgForeignDataWrapperError || {});
var PgPlPgsqlError = /* @__PURE__ */ ((PgPlPgsqlError2) => {
  PgPlPgsqlError2["PlpgsqlError"] = "P0000";
  PgPlPgsqlError2["RaiseException"] = "P0001";
  PgPlPgsqlError2["NoDataFound"] = "P0002";
  PgPlPgsqlError2["TooManyRows"] = "P0003";
  PgPlPgsqlError2["AssertFailure"] = "P0004";
  return PgPlPgsqlError2;
})(PgPlPgsqlError || {});
var PgInternalError = /* @__PURE__ */ ((PgInternalError2) => {
  PgInternalError2["InternalError"] = "XX000";
  PgInternalError2["DataCorrupted"] = "XX001";
  PgInternalError2["IndexCorrupted"] = "XX002";
  return PgInternalError2;
})(PgInternalError || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PgCardinalityViolation,
  PgCaseNotFound,
  PgConfigurationFileError,
  PgConnectionException,
  PgDataException,
  PgDependentPrivilegeDescriptorsStillExist,
  PgDiagnosticsException,
  PgExternalRoutineException,
  PgExternalRoutineInvocationException,
  PgFeatureNotSupported,
  PgForeignDataWrapperError,
  PgInsufficientResources,
  PgIntegrityConstraintViolation,
  PgInternalError,
  PgInvalidAuthorizationSpecification,
  PgInvalidCatalogName,
  PgInvalidCursorName,
  PgInvalidCursorState,
  PgInvalidGrantor,
  PgInvalidRoleSpecification,
  PgInvalidSchemaName,
  PgInvalidSqlStatementName,
  PgInvalidTransactionInitiation,
  PgInvalidTransactionState,
  PgInvalidTransactionTermination,
  PgLocatorException,
  PgNoData,
  PgObjectNotInPrerequisiteState,
  PgOperatorIntervention,
  PgPlPgsqlError,
  PgProgramLimitExceeded,
  PgSavepointException,
  PgSnapshotFailure,
  PgSqlRoutineException,
  PgSqlStatementNotYetComplete,
  PgSuccessfulCompletion,
  PgSyntaxErrorOrAccessRuleViolation,
  PgSystemError,
  PgTransactionRollback,
  PgTriggeredActionException,
  PgTriggeredDataChangeViolation,
  PgWarning,
  PgWithCheckOptionViolation
});
//# sourceMappingURL=postgres-errors.cjs.map