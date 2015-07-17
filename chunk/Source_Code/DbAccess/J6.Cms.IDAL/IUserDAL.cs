//
//
//  Copyright 2011 (C) S1N1.COM.All rights reseved.
//
//  @ Project : OSite
//  @ File Name : IUserDAL.cs
//  @ Date : 2011/8/22
//  @ Author : 
// Note: �û��������ظ�
//
//

using System;
using System.Data;
using J6.Cms.Domain.Interface.User;
using J6.Cms.Domain.Interface.Value;
using J6.DevFw.Data;

namespace J6.Cms.IDAL
{
    public interface IUserDal
    {
        /// <summary>
        /// �����û�
        /// </summary>
        /// <param name="siteId"></param>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <param name="name"></param>
        /// <param name="groupId"></param>
        /// <param name="available"></param>
        void CreateUser(int siteId, string username, string password,
            string name, int groupId, bool available);

        /// <summary>
        /// �����û���Ϣ
        /// </summary>
        int SaveUser(IUser user,bool isNew);

        /// <summary>
        /// ɾ���û�
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        bool DeleteUser(string username);

        /// <summary>
        /// �����û�����ȡ�û���Ϣ
        /// </summary>
        /// <param name="username"></param>
        /// <param name="func"></param>
        void GetUserCredential(string username, DataReaderFunc func);

        /// <summary>
        /// �����û�����¼ʱ��
        /// </summary>
        void UpdateUserLastLoginDate(string username, DateTime date);

        /// <summary>
        /// ��ȡ�����û�
        /// </summary>
        /// <returns></returns>
        DataTable GetAllUser();

        /// <summary>
        /// ����û����Ƿ����
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        bool UserIsExist(string username);


        /// <summary>
        /// �޸�����(����ȷ��ԭ����)
        /// </summary>
        /// <param name="username"></param>
        /// <param name="newPassword"></param>
        void ModifyPassword(string username, string newPassword);

      

        /// <summary>
        /// �û������
        /// </summary>
        /// <param name="groupId"></param>
        /// <param name="groupName"></param>
        void RenameUserGroup(int groupId, string groupName);

        /// <summary>
        /// ��������
        /// </summary>
        /// <param name="name"></param>
        /// <param name="path"></param>
        /// <param name="available"></param>
        /// <returns></returns>
        bool CreateOperation(string name, string path, bool available);

        /// <summary>
        /// ɾ������
        /// </summary>
        /// <param name="id"></param>
        void DeleteOperation(int id);

        /// <summary>
        /// ����ID��ò���
        /// </summary>
        /// <param name="id"></param>
        /// <param name="func"></param>
        void GetOperation(int id, DataReaderFunc func);

        /// <summary>
        /// ��ȡ���в���
        /// </summary>
        /// <returns></returns>
        void GetOperations(DataReaderFunc func);

        /// <summary>
        /// ���²���
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <param name="path"></param>
        /// <param name="available"></param>
        void UpdateOperation(int id, string name, string path, bool available);

        /// <summary>
        /// ��ȡ��ҳ�����б�
        /// </summary>
        /// <param name="pageSize"></param>
        /// <param name="currentPageIndex"></param>
        /// <param name="recordCount"></param>
        /// <param name="pageCount"></param>
        /// <returns></returns>
        DataTable GetPagedOperationList(int pageSize, int currentPageIndex, out int recordCount, out int pageCount);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="available"></param>
        /// <param name="pageSize"></param>
        /// <param name="currentPageIndex"></param>
        /// <param name="recordCount"></param>
        /// <param name="pageCount"></param>
        /// <returns></returns>
        DataTable GetPagedAvailableOperationList(bool available, int pageSize, int currentPageIndex, out int recordCount,
            out int pageCount);

        /// <summary>
        /// �����û���Ȩ��
        /// </summary>
        /// <param name="groupId"></param>
        /// <param name="permissions"></param>
        void UpdateUserGroupPermissions(int groupId, string permissions);

        void GetUserById(int id, DataReaderFunc func);
        DataTable GetMyUserTable(int appId, int userId);
        int SaveCredential(Credential credential,bool isNew);
        void GetUserCredentialById(int userId, DataReaderFunc func);
        void ReadUserRoles(int userId, DataReaderFunc func);
        void SaveUserRole(int userId, int appId, int flag);
        void CleanUserRoleFlag(int userId, int appId);
    }
}