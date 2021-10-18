using System.Collections.Generic;
using VirtoCommerce.Platform.Core.Settings;

namespace VirtoCommerce.gdpr.Core
{
    public static class ModuleConstants
    {
        public static class Security
        {
            public static class Permissions
            {
                public const string Access = "gdprModule:access";
                public const string Create = "gdprModule:create";
                public const string Read = "gdprModule:read";
                public const string Update = "gdprModule:update";
                public const string Delete = "gdprModule:delete";

                public static string[] AllPermissions { get; } = { Read, Create, Access, Update, Delete };
            }
        }

        public static class Settings
        {
            public static class General
            {
                public static SettingDescriptor gdprModuleEnabled { get; } = new SettingDescriptor
                {
                    Name = "gdprModule.gdprModuleEnabled",
                    GroupName = "gdprModule|General",
                    ValueType = SettingValueType.Boolean,
                    DefaultValue = false
                };

                public static SettingDescriptor gdprModulePassword { get; } = new SettingDescriptor
                {
                    Name = "gdprModule.gdprModulePassword",
                    GroupName = "gdprModule|Advanced",
                    ValueType = SettingValueType.SecureString,
                    DefaultValue = "qwerty"
                };

                public static IEnumerable<SettingDescriptor> AllSettings
                {
                    get
                    {
                        yield return gdprModuleEnabled;
                        yield return gdprModulePassword;
                    }
                }
            }

            public static IEnumerable<SettingDescriptor> AllSettings
            {
                get
                {
                    return General.AllSettings;
                }
            }
        }
    }
}
