declare namespace Sippreep {
    namespace Extensions {
        namespace ModelFilter {
            /**
             * 模型属性过滤插件
             */
            export interface ModelFilterExtension {
                /**
                 * 列出所有属性名
                 * @returns Promise<["Name","Category","设计选项","体积","类型","底部限制条件",...]>
                 */
                listPropertyNames(): Promise<string[]>;

                /**
                 * 列出指定属性名的可能值
                 * @param attributeName 指定属性名 eg:"标高"
                 * @returns Promise<["$NoProperty$","标高 0","标高 4800","标高 8400"]>
                 */
                listPropertyValues(attributeName: string): Promise<object[]>;

                /**
                 * 列出指定属性名的所有值和对应的dbid
                 * @param attributeName 
                 */
                listPropertyValueWithObjectId(attributeName: string): Promise<Map<object, string[]>>;

                /**
                 * 获取指定属性名的详细信息
                 * @param attributeNames 指定属性名集合
                 * @returns [{attributeName: "Name",displayCategory: "",displayName: "Name",displayValue: undefined,hidden: false,precision: 0,type: 20,units: null},
                 * {attributeName: "设计选项",displayCategory: "Internal",displayName: "设计选项",displayValue: undefined,hidden: false,precision: 0,type: 20,units: null}]
                 */
                listProperties(attributeNames?: string[]): Promise<Sippreep.Viewing.Property[]>;

                /**
                 * 列出指定属性名和属性值的对象集合
                 * @param attributeName 指定属性名
                 * @param attributeValues 指定包含的属性值或集合
                 * @param exclude 是否排除指定属性值
                 */
                listObjectIDs(attributeName: string, attributeValues: object[], exclude: boolean): Promise<number[]>;
                /**
                 * 获取指定对象的属性类
                 * @param attributeNames 获取指定属性
                 */
                listObjectProperties(dbid: number, attributeNames?: string[]): Promise<Sippreep.Viewing.Property[]>;

                /**
                 * 获取指定条件符合的模型对象dbid
                 */
                search(filter: ModelPropertyFilter): Promise<number[]>;

            }
            /**
             * 用此值代表不包含指定属性名的值。
             */
            export const ModelFilterNoPropertyValue = "$NoProperty$";

            /**
             * 模型属性过滤条件
             */
            export class ModelPropertyFilter {
                /**
                 * 属性名
                 */
                name: string;
                /**
                 * 是否排除
                 */
                exclude: boolean;
                /**
                 * 属性值集合
                 */
                values: object[];
                /**
                 * 且条件
                 */
                andFilter: ModelPropertyFilter;
            }


        }
    }
}


